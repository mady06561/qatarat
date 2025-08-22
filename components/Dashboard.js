function Dashboard({ currentUser, onNavigate, onUserUpdate }) {
  try {
    const [stats, setStats] = React.useState({
      totalWebsites: 0,
      totalVisits: 0,
      availableSites: 0
    });

    React.useEffect(() => {
      loadStats();
      const interval = setInterval(loadStats, 30000);
      return () => clearInterval(interval);
    }, [currentUser]);

    const loadStats = async () => {
      try {
        const websites = await trickleListObjects('website', 100, true);
        const userWebsites = websites.items.filter(w => w.objectData.ownerId === currentUser.id);
        
        const visits = await trickleListObjects('visit', 100, true);
        const userVisits = visits.items.filter(v => v.objectData.userId === currentUser.id);
        
        const visitsToUserSites = visits.items.filter(v => {
          const website = websites.items.find(w => w.objectId === v.objectData.websiteId);
          return website && website.objectData.ownerId === currentUser.id;
        });
        
        const availableSites = websites.items.filter(w => 
          w.objectData.isActive && 
          w.objectData.ownerId !== currentUser.id &&
          !visits.items.some(v => 
            v.objectData.userId === currentUser.id && 
            v.objectData.websiteId === w.objectId
          )
        );

        setStats({
          totalWebsites: userWebsites.length,
          totalVisits: userVisits.length,
          availableSites: availableSites.length,
          receivedVisits: visitsToUserSites.length
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    return (
      <div className="max-w-6xl mx-auto" data-name="dashboard" data-file="components/Dashboard.js">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            مرحباً بك، {currentUser.username}
          </h1>
          <p className="text-center text-[var(--text-secondary)]">
            لديك {currentUser.points} نقطة متاحة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-globe text-2xl text-blue-600"></div>
            </div>
            <h3 className="text-xl font-semibold mb-2">مواقعي</h3>
            <p className="text-3xl font-bold text-[var(--primary-color)]">{stats.totalWebsites}</p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-mouse-pointer-click text-2xl text-green-600"></div>
            </div>
            <h3 className="text-xl font-semibold mb-2">زياراتي</h3>
            <p className="text-3xl font-bold text-[var(--accent-color)]">{stats.totalVisits}</p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-trending-up text-2xl text-purple-600"></div>
            </div>
            <h3 className="text-xl font-semibold mb-2">زيارات مكتسبة</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.receivedVisits || 0}</p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-target text-2xl text-orange-600"></div>
            </div>
            <h3 className="text-xl font-semibold mb-2">المتاحة</h3>
            <p className="text-3xl font-bold text-orange-600">{stats.availableSites}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">إدارة المواقع</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              أضف مواقعك واحصل على زيارات من المستخدمين الآخرين
            </p>
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('add-website')}
                className="btn btn-primary w-full"
              >
                إضافة موقع جديد
              </button>
              <button
                onClick={() => onNavigate('websites')}
                className="btn btn-secondary w-full"
              >
                عرض مواقعي
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold mb-4">كسب النقاط</h3>
            <p className="text-[var(--text-secondary)] mb-4">
              قم بزيارة مواقع المستخدمين الآخرين واكسب نقاط
            </p>
            <button
              onClick={() => onNavigate('visit-sites')}
              className="btn btn-success w-full"
              disabled={stats.availableSites === 0}
            >
              {stats.availableSites > 0 ? 'ابدأ الزيارات' : 'لا توجد مواقع متاحة'}
            </button>
          </div>

          <div className="card bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="icon-star text-2xl text-blue-600"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">صفحة هبوط ممتازة</h3>
              <p className="text-sm text-blue-700 mb-4">
                احصل على صفحة هبوط احترافية مجاناً
              </p>
              <a
                href="https://b0p1c1qg347v.trickle.host"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
              >
                زيارة صفحة الهبوط
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Dashboard component error:', error);
    return null;
  }
}