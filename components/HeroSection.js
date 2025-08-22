function HeroSection({ onNavigate }) {
  try {
    return (
      <section className="hero-gradient py-20 px-4" data-name="hero-section" data-file="components/HeroSection.js">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="hero-text text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              قطرات لتبادل زيارات الروابط
              <span className="block text-yellow-300 text-4xl md:text-5xl lg:text-6xl mt-2">
                الموقع الأول
              </span>
            </h1>
            
            <p className="hero-text text-xl md:text-2xl lg:text-3xl mb-8 opacity-90">
              جلب زيارات حقيقية من محرك جوجل
            </p>
            
            <div className="bg-white bg-opacity-20 rounded-xl p-6 mb-8 backdrop-blur-sm">
              <p className="text-white text-lg md:text-xl mb-4">
                ✅ زيارات حقيقية 100% من محرك البحث جوجل
              </p>
              <p className="text-white text-lg md:text-xl mb-4">
                ✅ نظام نقاط عادل وشفاف
              </p>
              <p className="text-white text-lg md:text-xl">
                ✅ سهولة في الاستخدام وأمان تام
              </p>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={() => onNavigate('register')}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-xl text-lg transition-colors duration-200 shadow-lg"
              >
                ابدأ الآن مجاناً
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('HeroSection component error:', error);
    return null;
  }
}
