function AddWebsite({ currentUser, onUserUpdate, onNavigate }) {
  try {
    const [url, setUrl] = React.useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [verificationCode, setVerificationCode] = React.useState('');

    const extractIdFromUrl = (url) => {
      try {
        const urlObj = new URL(url);
        const params = new URLSearchParams(urlObj.search);
        return params.get('id') || '';
      } catch {
        return '';
      }
    };

    const fetchVerificationCode = async (url) => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/1_pRcNrDLMtIN_91T9xEYG7BTjUurd_vHmzUVIw5hbKM/edit?usp=sharing');
        const text = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const rows = doc.querySelectorAll('tr');
        
        for (let row of rows) {
          const cells = row.querySelectorAll('td');
          if (cells.length >= 2 && cells[0].textContent.trim() === url) {
            return cells[1].textContent.trim();
          }
        }
        return null;
      } catch (error) {
        console.error('Error fetching verification code:', error);
        return null;
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');

      const visits = await trickleListObjects('visit', 100, true);
      const userVisits = visits.items.filter(v => v.objectData.userId === currentUser.id);
      const requiredPoints = userVisits.length >= 10 ? 5 : 10;

      if (currentUser.points < requiredPoints) {
        setError(`تحتاج إلى ${requiredPoints} نقاط على الأقل لإضافة موقع جديد`);
        return;
      }

      if (!AuthUtils.validateUrl(url)) {
        setError('رابط الموقع غير صحيح');
        return;
      }

      if (!url.includes('trickle.host')) {
        const useOurLanding = confirm(
          'يجب أن يكون الموقع في دومين trickle.host\n\n' +
          'هل تريد استخدام صفحة الهبوط المجانية الخاصة بنا؟\n' +
          'https://b0p1c1qg347v.trickle.host'
        );
        
        if (useOurLanding) {
          window.open('https://b0p1c1qg347v.trickle.host', '_blank');
        }
        return;
      }

      const extractedId = extractIdFromUrl(url);
      if (!extractedId) {
        alert('عليك بالتوجه الى رابط صفحة الهبوط https://b0p1c1qg347v.trickle.host');
        return;
      }

      setLoading(true);

      try {
        const websites = await trickleListObjects('website', 100, true);
        const existingWebsite = websites.items.find(w => w.objectData.url === url);

        if (existingWebsite) {
          setError('هذا الموقع مضاف بالفعل');
          setLoading(false);
          return;
        }

        const fetchedCode = await fetchVerificationCode(url);
        if (!fetchedCode) {
          alert('عليك بالتوجه الى رابط صفحة الهبوط https://b0p1c1qg347v.trickle.host');
          setLoading(false);
          return;
        }
        
        const websiteData = await trickleCreateObject('website', {
          url: url,
          websiteId: extractedId,
          verificationCode: fetchedCode,
          ownerId: currentUser.id,
          isActive: true,
          isAdminSite: false,
          lastVisited: null
        });

        const pointsToDeduct = userVisits.length >= 10 ? 5 : 10;
        const currentUserData = await trickleGetObject('user', currentUser.id);
        const newPoints = Math.max(0, (currentUserData.objectData.points || 0) - pointsToDeduct);
        
        await trickleUpdateObject('user', currentUser.id, {
          ...currentUserData.objectData,
          points: newPoints
        });

        const updatedUser = { ...currentUser, points: newPoints };
        onUserUpdate(updatedUser);
        StorageUtils.setCurrentUser(updatedUser);

        setVerificationCode(fetchedCode);
        setSuccess(`تم إضافة الموقع بنجاح! تم خصم ${pointsToDeduct} نقاط من حسابك. معرف الموقع: ${extractedId}`);
        setUrl('');
        
        setTimeout(() => {
          onNavigate('websites');
        }, 3000);
      } catch (err) {
        setError('حدث خطأ في إضافة الموقع');
      }
      setLoading(false);
    };

    return (
      <div className="max-w-md mx-auto" data-name="add-website" data-file="components/AddWebsite.js">
        <div className="card">
          <h2 className="text-2xl font-bold text-center mb-6">إضافة موقع جديد</h2>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded mb-4">{success}</div>
          )}

          {verificationCode && (
            <div className="bg-blue-50 p-4 rounded mb-4">
              <h3 className="font-semibold mb-2">كود التحقق:</h3>
              <div className="font-mono text-lg bg-white p-3 rounded border">
                {verificationCode}
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">رابط الموقع</label>
              <input
                type="url"
                className="input-field"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://b0p1c1qg347v.trickle.host/landing.html?id=your_id"
                required
              />
            </div>

            <button
              type="submit"
              
              className="btn btn-primary w-full mb-4"
              disabled={loading}
            >
              {loading ? 'جاري الإضافة...' : 'إضافة موقع'}
            </button>
          </form>

          <button
            onClick={() => onNavigate('websites')}
            className="btn btn-secondary w-full"
          >
            عرض مواقعي
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AddWebsite component error:', error);
    return null;
  }

}