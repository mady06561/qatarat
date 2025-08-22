function FeaturesSection() {
  try {
    const features = [
      {
        icon: 'search',
        title: 'زيارات من جوجل',
        description: 'جميع الزيارات تأتي من محرك البحث جوجل بطريقة طبيعية وآمنة'
      },
      {
        icon: 'shield-check',
        title: 'آمان وموثوقية',
        description: 'نظام آمن 100% يحمي موقعك من أي مخاطر أو مشاكل'
      },
      {
        icon: 'trending-up',
        title: 'زيادة الترافيك',
        description: 'احصل على زيارات حقيقية تساعد في تحسين ترتيب موقعك'
      },
      {
        icon: 'star',
        title: 'نظام نقاط عادل',
        description: 'نظام نقاط شفاف وعادل يضمن حصولك على زيارات مقابل مشاركتك'
      },
      {
        icon: 'clock',
        title: 'سرعة في التنفيذ',
        description: 'احصل على زيارات فورية لموقعك خلال دقائق من التسجيل'
      },
      {
        icon: 'users',
        title: 'مجتمع نشط',
        description: 'انضم لآلاف المستخدمين الذين يتبادلون الزيارات يومياً'
      }
    ];

    return (
      <section className="py-16 bg-gray-50" data-name="features-section" data-file="components/FeaturesSection.js">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              لماذا نحن الأفضل؟
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم لك أفضل خدمة تبادل زيارات في العالم مع ضمان الجودة والأمان
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className={`icon-${feature.icon} text-2xl text-blue-600`}></div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('FeaturesSection component error:', error);
    return null;
  }
}