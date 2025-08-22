function VisitSites({ currentUser, onUserUpdate }) {
  try {
    const [availableSites, setAvailableSites] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [verifyCode, setVerifyCode] = React.useState('');
    const [selectedSite, setSelectedSite] = React.useState(null);
    const [verifying, setVerifying] = React.useState(false);

    React.useEffect(() => {
      loadAvailableSites();
    }, [currentUser]);

    const loadAvailableSites = async () => {
      try {
        const [websites, visits] = await Promise.all([
          trickleListObjects('website', 100, true),
          trickleListObjects('visit', 100, true)
        ]);

        const userVisits = visits.items.filter(v => v.objectData.userId === currentUser.id);
        const available = websites.items.filter(w => {
          const isActive = w.objectData.isActive;
          const notOwner = w.objectData.ownerId !== currentUser.id;
          const notVisited = !userVisits.some(v => v.objectData.websiteId === w.objectId);
          
          if (w.objectData.isAdminSite) {
            const lastVisit = userVisits.find(v => v.objectData.websiteId === w.objectId);
            if (lastVisit) {
              const visitDate = new Date(lastVisit.objectData.visitedAt);
              const now = new Date();
              const hoursSinceVisit = (now - visitDate) / (1000 * 60 * 60);
              return hoursSinceVisit >= 24;
            }
            return true;
          }
          
          return isActive && notOwner && notVisited;
        });

        setAvailableSites(available);
      } catch (error) {
        console.error('Error loading available sites:', error);
      }
      setLoading(false);
    };

    const visitSite = (website) => {
      const googleUrl = 'https://www.google.com/search?q="https://ah74ag1m2ucb.trickle.host"';
      window.open(googleUrl, '_blank');
      setSelectedSite(website);
    };

    const submitVerification = async () => {
      if (!selectedSite || !verifyCode) return;

      setVerifying(true);
      
      if (verifyCode === selectedSite.objectData.verificationCode) {
        try {
          await trickleCreateObject('visit', {
            userId: currentUser.id,
            websiteId: selectedSite.objectId,
            visitedAt: new Date().toISOString()
          });

          const currentUserData = await trickleGetObject('user', currentUser.id);
          const newPoints = Math.max(0, (currentUserData.objectData.points || 0) + 1);
          
          await trickleUpdateObject('user', currentUser.id, {
            ...currentUserData.objectData,
            points: newPoints
          });

          if (!selectedSite.objectData.isAdminSite && selectedSite.objectData.ownerId !== 'admin') {
            try {
              const websiteOwner = await trickleGetObject('user', selectedSite.objectData.ownerId);
              const ownerNewPoints = Math.max(0, (websiteOwner.objectData.points || 0) + 10);
              
              await trickleUpdateObject('user', selectedSite.objectData.ownerId, {
                ...websiteOwner.objectData,
                points: ownerNewPoints
              });
            } catch (error) {
              console.error('Error updating website owner points:', error);
            }
          }

          const updatedUser = { ...currentUser, points: newPoints };
          onUserUpdate(updatedUser);
          StorageUtils.setCurrentUser(updatedUser);
          
          setSelectedSite(null);
          setVerifyCode('');
          loadAvailableSites();
          alert(`تم تأكيد الزيارة! حصلت على نقطة واحدة. إجمالي النقاط: ${newPoints}`);
        } catch (error) {
          console.error('Visit verification error:', error);
          alert('حدث خطأ في تسجيل الزيارة. يرجى المحاولة مرة أخرى.');
        }
      } else {
        alert('كود التحقق غير صحيح');
      }
      setVerifying(false);
    };

    if (loading) {
      return <div className="text-center">جاري التحميل...</div>;
    }

    return (
      <div className="max-w-4xl mx-auto" data-name="visit-sites" data-file="components/VisitSites.js">
        <h1 className="text-3xl font-bold mb-8">زيارة المواقع</h1>

        {availableSites.length === 0 ? (
          <div className="card text-center">
            <h3 className="text-xl font-semibold mb-2">لا توجد مواقع متاحة</h3>
            <p className="text-[var(--text-secondary)]">
              لا توجد مواقع متاحة للزيارة حالياً
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {availableSites.map(website => (
              <div key={website.objectId} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">ID: {website.objectData.websiteId || website.objectId}</h3>
                    <span className="text-sm text-[var(--text-secondary)] mb-2 block">
                      {website.objectData.isAdminSite ? 'موقع خاص' : 'موقع مستخدم'}
                    </span>
                    <p className="text-xs text-gray-500">
                      عليك بنسخ ID لكي تبحث به عن كود التحقق الصحيح
                    </p>
                  </div>
                  <button
                    onClick={() => visitSite(website)}
                    className="btn btn-primary"
                  >
                    زيارة الموقع
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedSite && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">تأكيد الزيارة</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                أدخل كود التحقق الذي وجدته في الموقع:
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-4 text-sm text-blue-800">
                <h4 className="font-semibold mb-2">تعليمات مهمة:</h4>
                <p className="leading-relaxed">
                  عليك بالنقر على أول نتيجة بحث تجدها "مجموعة المواقع المميزة" وعند النقر يظهر لك البحث عن الموقع، ادخل ID الذي نسخته من زيارة المواقع
                </p>
              </div>
              
              <input
                type="text"
                className="input-field mb-4"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                placeholder="كود التحقق"
              />
              <div className="flex gap-2">
                <button
                  onClick={submitVerification}
                  className="btn btn-success flex-1"
                  disabled={verifying || !verifyCode}
                >
                  {verifying ? 'جاري التحقق...' : 'تأكيد'}
                </button>
                <button
                  onClick={() => {
                    setSelectedSite(null);
                    setVerifyCode('');
                  }}
                  className="btn btn-secondary flex-1"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('VisitSites component error:', error);
    return null;
  }
}
