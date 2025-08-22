function AdminPanel() {
  try {
    const [users, setUsers] = React.useState([]);
    const [websites, setWebsites] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [newSite, setNewSite] = React.useState({ url: '', verificationCode: '', siteName: '' });
    const [countryStats, setCountryStats] = React.useState([]);

    React.useEffect(() => {
      loadData();
    }, []);

    const loadData = async () => {
      try {
        const [usersData, websitesData] = await Promise.all([
          trickleListObjects('user', 100, true),
          trickleListObjects('website', 100, true)
        ]);
        setUsers(usersData.items);
        setWebsites(websitesData.items);
        
        const stats = {};
        usersData.items.forEach(user => {
          const country = user.objectData.country || 'غير محدد';
          stats[country] = (stats[country] || 0) + 1;
        });
        
        const sortedStats = Object.entries(stats)
          .map(([country, count]) => ({ country, count }))
          .sort((a, b) => b.count - a.count);
          
        setCountryStats(sortedStats);
      } catch (error) {
        console.error('Error loading admin data:', error);
      }
      setLoading(false);
    };

    const addAdminSite = async (e) => {
      e.preventDefault();
      if (!newSite.url || !newSite.verificationCode || !newSite.siteName) return;

      try {
        await trickleCreateObject('website', {
          url: newSite.url,
          siteName: newSite.siteName,
          verificationCode: newSite.verificationCode,
          ownerId: 'admin',
          isActive: true,
          isAdminSite: true,
          lastVisited: null
        });
        setNewSite({ url: '', verificationCode: '', siteName: '' });
        loadData();
      } catch (error) {
        console.error('Error adding admin site:', error);
      }
    };

    const toggleWebsiteStatus = async (websiteId, currentStatus, reason = '') => {
      try {
        const website = websites.find(w => w.objectId === websiteId);
        await trickleUpdateObject('website', websiteId, {
          ...website.objectData,
          isActive: !currentStatus,
          deactivationReason: !currentStatus ? '' : reason,
          deactivatedAt: !currentStatus ? null : new Date().toISOString()
        });
        loadData();
      } catch (error) {
        console.error('Error updating website status:', error);
      }
    };

    const deleteWebsite = async (websiteId) => {
      if (!confirm('هل أنت متأكد من حذف هذا الموقع؟')) return;
      
      try {
        await trickleDeleteObject('website', websiteId);
        loadData();
      } catch (error) {
        console.error('Error deleting website:', error);
      }
    };

    const downloadDatabase = async () => {
      try {
        const [usersData, websitesData, visitsData] = await Promise.all([
          trickleListObjects('user', 100, true),
          trickleListObjects('website', 100, true),
          trickleListObjects('visit', 100, true)
        ]);

        const exportData = {
          users: usersData.items,
          websites: websitesData.items,
          visits: visitsData.items,
          exportDate: new Date().toISOString(),
          projectInfo: {
            name: 'قطرات لتبادل زيارات الروابط',
            version: '1.0.0'
          }
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `qatarat-database-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading database:', error);
        alert('حدث خطأ في تحميل قاعدة البيانات');
      }
    };

    if (loading) {
      return <div className="text-center">جاري التحميل...</div>;
    }

    return (
      <div className="max-w-7xl mx-auto" data-name="admin-panel" data-file="components/AdminPanel.js">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">لوحة المدير</h1>
          <button
            onClick={downloadDatabase}
            className="btn btn-success flex items-center gap-2"
          >
            <div className="icon-download text-lg"></div>
            تحميل قاعدة البيانات
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">إضافة موقع خاص</h2>
            <form onSubmit={addAdminSite} className="space-y-4">
              <input
                type="text"
                placeholder="اسم الموقع"
                className="input-field w-full"
                value={newSite.siteName}
                onChange={(e) => setNewSite({...newSite, siteName: e.target.value})}
                required
              />
              <input
                type="url"
                placeholder="رابط الموقع"
                className="input-field w-full"
                value={newSite.url}
                onChange={(e) => setNewSite({...newSite, url: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="كود التحقق"
                className="input-field w-full"
                value={newSite.verificationCode}
                onChange={(e) => setNewSite({...newSite, verificationCode: e.target.value})}
                required
              />
              <button type="submit" className="btn btn-primary w-full">إضافة</button>
            </form>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-4">إحصائيات المستخدمين</h2>
            <div className="max-h-64 overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-right p-2">الدولة</th>
                    <th className="text-right p-2">العدد</th>
                  </tr>
                </thead>
                <tbody>
                  {countryStats.map((stat, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{stat.country}</td>
                      <td className="p-2 font-semibold text-blue-600">{stat.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4">إدارة المواقع</h2>
          <div className="space-y-4">
            {websites.map(website => (
              <div key={website.objectId} className="flex items-center justify-between p-4 border rounded">
                <div className="flex-1">
                  <div className="font-medium">ID: {website.objectData.websiteId || website.objectId}</div>
                  <div className="text-sm text-gray-600 mb-1">الرابط: {website.objectData.url}</div>
                  <div className="text-sm text-gray-500">
                    كود التحقق: {website.objectData.verificationCode}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {website.objectData.isAdminSite ? 'موقع خاص' : 'موقع مستخدم'}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleWebsiteStatus(website.objectId, website.objectData.isActive)}
                    className={`btn text-xs ${website.objectData.isActive ? 'btn-danger' : 'btn-success'}`}
                  >
                    {website.objectData.isActive ? 'إلغاء تنشيط' : 'تنشيط'}
                  </button>
                  <button
                    onClick={() => deleteWebsite(website.objectId)}
                    className="btn btn-danger text-xs"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AdminPanel component error:', error);
    return null;
  }
}