function Footer() {
  try {
    return (
      <footer className="bg-gray-900 text-white py-12" data-name="footer" data-file="components/Footer.js">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">
                موقع تبادل زيارات الروابط الأول
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                نحن الموقع الرائد في مجال تبادل زيارات الروابط في العالم. نقدم خدمة موثوقة وآمنة لزيادة زيارات مواقعكم من محرك البحث جوجل بطريقة طبيعية وفعالة.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">مواقع تهمك</h4>
              <div className="space-y-2">
                <div>
                  <a href="https://ah74ag1m2ucb.trickle.host" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-300 hover:text-white transition-colors block">
                    مجموعة المواقع المميزة
                  </a>
                </div>
                <div>
                  <a href="https://news.google.com/home?hl=ar&gl=EG&ceid=EG%3Aar" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-300 hover:text-white transition-colors block">
                    اخبار نيوز
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">اتصل بنا</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="icon-mail text-yellow-400 ml-2"></div>
                  <a href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWsLSFHWFrgfjsDDTZgFwrmvFFStGDDMvCgdGTDHjVbrQjRXLnnJZHpjPvtdPMCtgSTmZJNTQ" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-300 hover:text-white transition-colors">
                    attallahg1981@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="icon-facebook text-yellow-400 ml-2"></div>
                  <a href="https://www.facebook.com/AttallahGuehiribin" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-300 hover:text-white transition-colors">
                    Facebook
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="icon-twitter text-yellow-400 ml-2"></div>
                  <a href="https://x.com/mady06569" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-300 hover:text-white transition-colors">
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="text-center">
            <div className="mb-4 space-x-4 space-x-reverse">
              <a href="privacy.html" target="_blank" className="text-gray-300 hover:text-white transition-colors text-sm">
                سياسة الخصوصية
              </a>
              <a href="about.html" target="_blank" className="text-gray-300 hover:text-white transition-colors text-sm">
                نبذة عنا
              </a>
            </div>
              <div className="text-gray-400 text-sm">
                © 2025 قطرات لتبادل الزيارات. جميع الحقوق محفوظة.
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}