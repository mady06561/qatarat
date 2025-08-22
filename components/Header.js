function Header({ currentUser, onLogout, currentPage, onNavigate, language, onLanguageChange }) {
  try {
    return (
      <header className="bg-white shadow-sm border-b border-[var(--border-color)]" data-name="header" data-file="components/Header.js">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button 
                onClick={() => {
                  onNavigate('home');
                  window.location.reload();
                }}
                className="flex items-center space-x-4 space-x-reverse hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center relative">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-4 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="absolute inset-0 border-2 border-white rounded-full"></div>
                </div>
                <h1 className="text-xl font-bold text-[var(--primary-color)]">
                  {t('siteName', language)}
                </h1>
              </button>
            </div>

            <nav className="flex items-center space-x-4 space-x-reverse">
              <LanguageSelector language={language} onLanguageChange={onLanguageChange} />
              
              {currentUser ? (
                <>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className={`px-3 py-2 rounded ${currentPage === 'dashboard' ? 'bg-[var(--primary-color)] text-white' : 'text-[var(--text-primary)] hover:bg-gray-100'}`}
                  >
                    {t('dashboard', language)}
                  </button>
                  
                  <button
                    onClick={() => onNavigate('websites')}
                    className={`px-3 py-2 rounded ${currentPage === 'websites' ? 'bg-[var(--primary-color)] text-white' : 'text-[var(--text-primary)] hover:bg-gray-100'}`}
                  >
                    {t('myWebsites', language)}
                  </button>
                  
                  <button
                    onClick={() => onNavigate('visit-sites')}
                    className={`px-3 py-2 rounded ${currentPage === 'visit-sites' ? 'bg-[var(--primary-color)] text-white' : 'text-[var(--text-primary)] hover:bg-gray-100'}`}
                  >
                    {t('visitSites', language)}
                  </button>

                  {currentUser.isAdmin && (
                    <button
                      onClick={() => onNavigate('admin')}
                      className={`px-3 py-2 rounded ${currentPage === 'admin' ? 'bg-[var(--primary-color)] text-white' : 'text-[var(--text-primary)] hover:bg-gray-100'}`}
                    >
                      {t('adminPanel', language)}
                    </button>
                  )}

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-sm text-[var(--text-secondary)]">
                      مرحباً، {currentUser.username}
                    </span>
                    <span className="bg-[var(--accent-color)] text-white px-2 py-1 rounded text-sm">
                      {currentUser.points} نقطة
                    </span>
                    <button
                      onClick={onLogout}
                      className="text-[var(--danger-color)] hover:bg-red-50 px-2 py-1 rounded"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                </>
              ) : null}
            </nav>
          </div>
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}