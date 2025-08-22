const Translations = {
  ar: {
    siteName: 'قطرات لتبادل زيارات الروابط',
    home: 'الرئيسية',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    dashboard: 'لوحة التحكم',
    myWebsites: 'مواقعي',
    visitSites: 'زيارة المواقع',
    adminPanel: 'لوحة المدير',
    privacy: 'سياسة الخصوصية',
    contactUs: 'اتصل بنا',
    aboutUs: 'نبذة عنا',
    startNow: 'ابدأ الآن مجاناً',
    newsTitle: 'أخبار الموقع',
    newsContent: 'مرحباً بكم في قطرات لتبادل زيارات الروابط - الموقع الأول لتبادل الزيارات الحقيقية من جوجل',
    featuredSites: 'مواقع تهمك',
    premiumSites: 'مجموعة المواقع المميزة',
    googleNews: 'اخبار نيوز'
  },
  en: {
    siteName: 'Qatarat Links Visit Exchange',
    aboutUs: 'About Us',
    featuredSites: 'Featured Sites',
    premiumSites: 'Premium Sites Collection',
    googleNews: 'Google News',
    home: 'Home',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    myWebsites: 'My Websites',
    visitSites: 'Visit Sites',
    adminPanel: 'Admin Panel',
    privacy: 'Privacy Policy',
    contactUs: 'Contact Us',
    startNow: 'Start Now Free',
    newsTitle: 'Site News',
    newsContent: 'Welcome to Qatarat Visit Exchange - The first site for real Google visit exchange'
  }
};

const t = (key, language = 'ar') => {
  return Translations[language] && Translations[language][key] ? Translations[language][key] : key;
};