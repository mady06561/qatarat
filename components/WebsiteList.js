function WebsiteList({ currentUser, onUserUpdate }) {
  try {
    const [websites, setWebsites] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadWebsites();
    }, [currentUser]);

    const loadWebsites = async () => {
      try {
        const websitesData = await trickleListObjects('website', 100, true);
        const userWebsites = websitesData.items.filter(w => w.objectData.ownerId === currentUser.id);
        setWebsites(userWebsites);
      } catch (error) {
        console.error('Error loading websites:', error);
      }
      setLoading(false);
    };

    const deleteWebsite = async (websiteId) => {
      if (!confirm('هل أنت متأكد من حذف هذا الموقع؟')) return;
      
      try {
        await trickleDeleteObject('website', websiteId);
        loadWebsites();
        
        const currentUserData = await trickleGetObject('user', currentUser.id);
        const newPoints = Math.max(0, (currentUserData.objectData.points || 0) + 10);
        
        await trickleUpdateObject('user', currentUser.id, {
          ...currentUserData.objectData,
          points: newPoints
        });
        
        const updatedUser = { ...currentUser, points: newPoints };
        onUserUpdate(updatedUser);
        StorageUtils.setCurrentUser(updatedUser);
      } catch (error) {
        console.error('Error deleting website:', error);
      }
    };

    const toggleWebsiteStatus = async (websiteId, currentStatus) => {
      try {
        const website = websites.find(w => w.objectId === websiteId);
        await trickleUpdateObject('website', websiteId, {
          ...website.objectData,
          isActive: !currentStatus
        });
        loadWebsites();
      } catch (error) {
        console.error('Error updating website status:', error);
      }
    };

    if (loading) {
      return <div className="text-center">جاري التحميل...</div>;
    }

    return (
      <div className="max-w-4xl mx-auto" data-name="website-list" data-file="components/WebsiteList.js">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">مواقعي</h1>
          <span className="text-lg">المجموع: {websites.length} موقع</span>
        </div>

        {websites.length === 0 ? (
          <div className="card text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-globe text-2xl text-gray-400"></div>
            </div>
            <h3 className="text-xl font-semibold mb-2">لا توجد مواقع</h3>
            <p className="text-[var(--text-secondary)] mb-4">لم تقم بإضافة أي مواقع بعد</p>
          </div>
        ) : (
          <div className="space-y-4">
            {websites.map(website => (
              <div key={website.objectId} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">ID: {website.objectId}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        website.objectData.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {website.objectData.isActive ? 'نشط' : 'غير نشط'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      Website ID: {website.objectData.websiteId || website.objectId}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      الرابط: {website.objectData.url}
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded mb-3">
                      <div className="text-sm text-[var(--text-secondary)] mb-1">كود التحقق:</div>
                      <div className="font-mono text-lg bg-white p-2 rounded border">
                        {website.objectData.verificationCode}
                      </div>
                    </div>

                    <div className="text-sm text-[var(--text-secondary)]">
                      تاريخ الإضافة: {StorageUtils.formatDate(website.createdAt)}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mr-4">
                    <button
                      onClick={() => toggleWebsiteStatus(website.objectId, website.objectData.isActive)}
                      className={`btn text-sm ${
                        website.objectData.isActive ? 'btn-danger' : 'btn-success'
                      }`}
                    >
                      {website.objectData.isActive ? 'إلغاء تنشيط' : 'تنشيط'}
                    </button>
                    
                    <button
                      onClick={() => deleteWebsite(website.objectId)}
                      className="btn btn-danger text-sm"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('WebsiteList component error:', error);
    return null;
  }
}