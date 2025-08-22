function AboutUs({ language = 'ar' }) {
  try {
    return (
      <div className="max-w-4xl mx-auto" data-name="about-us" data-file="components/AboutUs.js">
        <div className="card">
          <h1 className="text-3xl font-bold mb-8 text-center">نبذة عنا</h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">من نحن</h2>
              <p>
                موقع "قطرات لتبادل زيارات الروابط" هو المنصة الرائدة في العالم العربي لتبادل الزيارات الحقيقية من محرك البحث جوجل. 
                نحن نقدم خدمة مبتكرة وآمنة تساعد أصحاب المواقع على زيادة عدد زوار مواقعهم بطريقة طبيعية وفعالة.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">رؤيتنا</h2>
              <p>
                نسعى لأن نكون الخيار الأول لكل من يريد زيادة زيارات موقعه بطريقة آمنة ومضمونة، 
                ونهدف إلى بناء مجتمع قوي من أصحاب المواقع الذين يتبادلون الزيارات بشكل عادل وشفاف.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">مهمتنا</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>توفير منصة آمنة وموثوقة لتبادل الزيارات</li>
                <li>ضمان جودة الزيارات من محرك البحث جوجل</li>
                <li>تقديم نظام نقاط عادل وشفاف</li>
                <li>دعم أصحاب المواقع في تحسين ترتيب مواقعهم</li>
                <li>بناء مجتمع نشط من المستخدمين المتفاعلين</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">لماذا نحن مختلفون</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded">
                  <h3 className="font-semibold text-blue-800 mb-2">زيارات حقيقية 100%</h3>
                  <p className="text-sm text-blue-700">جميع الزيارات تأتي من محرك البحث جوجل</p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <h3 className="font-semibold text-green-800 mb-2">نظام آمان متقدم</h3>
                  <p className="text-sm text-green-700">حماية كاملة لمواقعكم من أي مخاطر</p>
                </div>
                <div className="bg-purple-50 p-4 rounded">
                  <h3 className="font-semibold text-purple-800 mb-2">نظام نقاط عادل</h3>
                  <p className="text-sm text-purple-700">شفافية كاملة في توزيع النقاط</p>
                </div>
                <div className="bg-orange-50 p-4 rounded">
                  <h3 className="font-semibold text-orange-800 mb-2">دعم فني متميز</h3>
                  <p className="text-sm text-orange-700">فريق دعم متاح على مدار الساعة</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">تواصل معنا</h2>
              <p className="mb-3">
                نحن دائماً هنا لمساعدتك. تواصل معنا في أي وقت:
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="icon-mail text-blue-600 ml-2"></div>
                  <a href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWsLSFHWFrgfjsDDTZgFwrmvFFStGDDMvCgdGTDHjVbrQjRXLnnJZHpjPvtdPMCtgSTmZJNTQ" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:underline">
                    attallahg1981@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="icon-facebook text-blue-600 ml-2"></div>
                  <a href="https://www.facebook.com/AttallahGuehiribin" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:underline">
                    صفحتنا على فيسبوك
                  </a>
                </div>
                <div className="flex items-center">
                  <div className="icon-twitter text-blue-600 ml-2"></div>
                  <a href="https://x.com/mady06569" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:underline">
                    حسابنا على تويتر
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AboutUs component error:', error);
    return null;
  }
}