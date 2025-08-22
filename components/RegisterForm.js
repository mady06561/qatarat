// components/RegisterForm.js - إصدار معدل
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
    const [connectionTested, setConnectionTested] = React.useState(false);

    const countries = WorldCountries.ar;

    // دالة اختبار الاتصال
    const testConnection = async () => {
      try {
        setLoading(true);
        setError('');
        
        if (!window.testAPIConnection) {
          throw new Error('وظيفة الاختبار غير متاحة');
        }

        const result = await window.testAPIConnection();
        
        if (result.success) {
          setSuccess('✓ الاتصال بالخادم ناجح');
          setConnectionTested(true);
          setTimeout(() => setSuccess(''), 3000);
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        setError('✗ فشل في الاتصال بالخادم: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    // دالة إنشاء حساب مبسطة
    const createUserDirectly = async (userData) => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbynQrbdtfREukdGi_PWRS-ORAKuqTbowW2U659dG4IdUjtirApr54n5uifuiTUNEwCF/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: 'create',
            type: 'user',
            data: userData
          })
        });

        if (!response.ok) {
          throw new Error('فشل في إنشاء الحساب');
        }

        const result = await response.json();
        return result.success;
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      setSuccess('');
      setLoading(true);

      try {
        // التحقق من البيانات
        if (formData.password !== formData.confirmPassword) {
          throw new Error('كلمات المرور غير متطابقة');
        }

        if (!formData.username || !formData.email || !formData.password || !formData.country) {
          throw new Error('جميع الحقول مطلوبة');
        }

        // إنشاء بيانات المستخدم
        const userData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          country: formData.country,
          points: 0,
          isAdmin: false
        };

        console.log('Creating user with data:', userData);

        // محاولة إنشاء الحساب مباشرة
        const created = await createUserDirectly(userData);
        
        if (created) {
          setSuccess('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول');
          setTimeout(() => onNavigate('login'), 2000);
        } else {
          throw new Error('فشل في إنشاء الحساب');
        }

      } catch (err) {
        console.error('Error in handleSubmit:', err);
        setError('حدث خطأ في إنشاء الحساب: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="max-w-md mx-auto" data-name="register-form">
        <div className="card">
          <h2 className="text-2xl font-bold text-center mb-6">إنشاء حساب جديد</h2>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4 flex items-center">
              <div className="icon-alert-circle mr-2"></div>
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded mb-4 flex items-center">
              <div className="icon-check-circle mr-2"></div>
              {success}
            </div>
          )}

          {/* زر اختبار الاتصال */}
          <div className="mb-4">
            <button
              type="button"
              onClick={testConnection}
              disabled={loading}
              className="btn btn-secondary w-full mb-2"
            >
              {loading ? 'جاري الاختبار...' : 'اختبار الاتصال بالخادم'}
            </button>
            {connectionTested && (
              <div className="text-sm text-green-600 text-center">
                ✓ جاهز لإنشاء الحساب
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">اسم المستخدم *</label>
              <input
                type="text"
                className="input-field"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
                disabled={!connectionTested}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني *</label>
              <input
                type="email"
                className="input-field"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                disabled={!connectionTested}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">الدولة *</label>
              <select
                className="input-field"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                required
                disabled={!connectionTested}
              >
                <option value="">اختر الدولة</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">كلمة المرور *</label>
              <input
                type="password"
                className="input-field"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                disabled={!connectionTested}
                minLength="6"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">تأكيد كلمة المرور *</label>
              <input
                type="password"
                className="input-field"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
                disabled={!connectionTested}
                minLength="6"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mb-4"
              disabled={loading || !connectionTested}
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
    return (
      <div className="max-w-md mx-auto">
        <div className="card text-center">
          <div className="text-red-600">حدث خطأ في تحميل نموذج التسجيل</div>
          <button onClick={() => window.location.reload()} className="btn btn-primary mt-4">
            إعادة تحميل الصفحة
          </button>
        </div>
      </div>
    );
  }
}
