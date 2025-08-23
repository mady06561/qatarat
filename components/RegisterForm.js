function RegisterForm({ onNavigate }) {
  try {
    const [formData, setFormData] = React.useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: ''
    });
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const countries = WorldCountries.ar;

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');
      setLoading(true);

      if (formData.password !== formData.confirmPassword) {
        setError('كلمات المرور غير متطابقة');
        setLoading(false);
        return;
      }

      if (!AuthUtils.validateEmail(formData.email)) {
        setError('البريد الإلكتروني غير صحيح');
        setLoading(false);
        return;
      }

      if (!AuthUtils.validatePassword(formData.password)) {
        setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        setLoading(false);
        return;
      }

      if (!formData.country) {
        setError('يرجى اختيار الدولة');
        setLoading(false);
        return;
      }

      try {
        const users = await trickleListObjects('user', 100, true);
        const existingUser = users.items.find(u => 
          u.objectData.username === formData.username || 
          u.objectData.email === formData.email
        );

        if (existingUser) {
          setError('اسم المستخدم أو البريد الإلكتروني مستخدم بالفعل');
          setLoading(false);
          return;
        }

        await trickleCreateObject('user', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          country: formData.country,
          points: 0,
          isAdmin: false
        });

        setSuccess('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول');
        setTimeout(() => onNavigate('login'), 2000);
      } catch (err) {
        setError('حدث خطأ في إنشاء الحساب');
      }
      setLoading(false);
    };

    return (
      <div className="max-w-md mx-auto" data-name="register-form" data-file="components/RegisterForm.js">
        <div className="card">
          <h2 className="text-2xl font-bold text-center mb-6">إنشاء حساب جديد</h2>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded mb-4">{success}</div>
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

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">الدولة</label>
              <select
                className="input-field"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                required
              >
                <option value="">اختر الدولة</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">كلمة المرور</label>
              <input
                type="password"
                className="input-field"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">تأكيد كلمة المرور</label>
              <input
                type="password"
                className="input-field"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mb-4"
              disabled={loading}
            >
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
            </button>
          </form>

          <p className="text-center text-sm">
            لديك حساب بالفعل؟{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-[var(--primary-color)] hover:underline"
            >
              تسجيل الدخول
            </button>
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('RegisterForm component error:', error);
    return null;
  }
}
