function LoginForm({ onLogin, onNavigate }) {
  try {
    const [formData, setFormData] = React.useState({
      username: '',
      password: ''
    });
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      try {
        const users = await trickleListObjects('user', 100, true);
        const user = users.items.find(u => 
          u.objectData.username === formData.username && 
          u.objectData.password === formData.password
        );

        if (user) {
          onLogin({
            id: user.objectId,
            username: user.objectData.username,
            email: user.objectData.email,
            points: user.objectData.points || 0,
            isAdmin: user.objectData.isAdmin || false
          });
        } else {
          setError('اسم المستخدم أو كلمة المرور غير صحيحة');
        }
      } catch (err) {
        setError('حدث خطأ في تسجيل الدخول');
      }
      setLoading(false);
    };

    return (
      <div className="max-w-md mx-auto" data-name="login-form" data-file="components/LoginForm.js">
        <div className="card">
          <h2 className="text-2xl font-bold text-center mb-6">تسجيل الدخول</h2>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">اسم المستخدم</label>
              <input
                type="text"
                className="input-field"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">كلمة المرور</label>
              <input
                type="password"
                className="input-field"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mb-4"
              disabled={loading}
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          <p className="text-center text-sm">
            ليس لديك حساب؟{' '}
            <button
              onClick={() => onNavigate('register')}
              className="text-[var(--primary-color)] hover:underline"
            >
              إنشاء حساب جديد
            </button>
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('LoginForm component error:', error);
    return null;
  }
}