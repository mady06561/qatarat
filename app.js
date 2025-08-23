class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">حدث خطأ</h1>
            <p className="text-gray-600 mb-4">عذراً، حدث خطأ غير متوقع.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Replace with your Google Apps Script URL
const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

// API Functions
async function trickleCreateObject(table, objectData) {
  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'create',
        table: table,
        objectData: objectData
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating object:', error);
    throw error;
  }
}

async function trickleGetObject(table, objectId) {
  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'read',
        table: table,
        objectId: objectId
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error getting object:', error);
    throw error;
  }
}

async function trickleUpdateObject(table, objectId, objectData) {
  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'update',
        table: table,
        objectId: objectId,
        objectData: objectData
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating object:', error);
    throw error;
  }
}

async function trickleDeleteObject(table, objectId) {
  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'delete',
        table: table,
        objectId: objectId
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting object:', error);
    throw error;
  }
}

async function trickleListObjects(table, limit = 100) {
  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'list',
        table: table,
        limit: limit
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Error listing objects:', error);
    throw error;
  }
}

function App() {
  try {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [currentPage, setCurrentPage] = React.useState('home');
    const [currentLanguage, setCurrentLanguage] = React.useState('ar');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const user = StorageUtils.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setCurrentPage('dashboard');
        updateUserFromDatabase(user.id);
      }
      setLoading(false);
    }, []);

    const updateUserFromDatabase = async (userId) => {
      try {
        const userData = await trickleGetObject('user', userId);
        const updatedUser = {
          id: userData.objectId,
          username: userData.objectData.username,
          email: userData.objectData.email,
          points: userData.objectData.points || 0,
          isAdmin: userData.objectData.isAdmin || false
        };
        setCurrentUser(updatedUser);
        StorageUtils.setCurrentUser(updatedUser);
      } catch (error) {
        console.error('Error updating user from database:', error);
      }
    };

    const handleLogin = (user) => {
      setCurrentUser(user);
      StorageUtils.setCurrentUser(user);
      setCurrentPage('dashboard');
    };

    const handleLogout = () => {
      setCurrentUser(null);
      StorageUtils.clearCurrentUser();
      setCurrentPage('login');
    };

    const handleUserUpdate = (updatedUser) => {
      setCurrentUser(updatedUser);
      StorageUtils.setCurrentUser(updatedUser);
    };

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl">جاري التحميل...</div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50" data-name="app" data-file="app.js">
        <Header 
          currentUser={currentUser} 
          onLogout={handleLogout}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          language={currentLanguage}
          onLanguageChange={setCurrentLanguage}
        />
        <NewsBar language={currentLanguage} />
        
        {currentPage === 'home' && !currentUser && (
          <>
            <HeroSection onNavigate={setCurrentPage} language={currentLanguage} />
            <FeaturesSection language={currentLanguage} />
          </>
        )}
        
        {currentPage === 'login' && !currentUser && (
          <main className="container mx-auto px-4 py-8">
            <LoginForm onLogin={handleLogin} onNavigate={setCurrentPage} language={currentLanguage} />
          </main>
        )}
        
        {currentPage === 'privacy' && (
          <main className="container mx-auto px-4 py-8">
            <PrivacyPolicy language={currentLanguage} />
          </main>
        )}
        
        {currentPage === 'register' && !currentUser && (
          <main className="container mx-auto px-4 py-8">
            <RegisterForm onNavigate={setCurrentPage} />
          </main>
        )}
        
        {currentPage === 'dashboard' && currentUser && (
          <main className="container mx-auto px-4 py-8">
            <Dashboard 
              currentUser={currentUser} 
              onNavigate={setCurrentPage}
              onUserUpdate={handleUserUpdate}
            />
          </main>
        )}
        
        {currentPage === 'admin' && currentUser?.isAdmin && (
          <main className="container mx-auto px-4 py-8">
            <AdminPanel />
          </main>
        )}
        
        {currentPage === 'websites' && currentUser && (
          <main className="container mx-auto px-4 py-8">
            <WebsiteList currentUser={currentUser} onUserUpdate={handleUserUpdate} />
          </main>
        )}
        
        {currentPage === 'add-website' && currentUser && (
          <main className="container mx-auto px-4 py-8">
            <AddWebsite currentUser={currentUser} onUserUpdate={handleUserUpdate} onNavigate={setCurrentPage} />
          </main>
        )}
        
        {currentPage === 'visit-sites' && currentUser && (
          <main className="container mx-auto px-4 py-8">
            <VisitSites currentUser={currentUser} onUserUpdate={handleUserUpdate} />
          </main>
        )}
        
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
