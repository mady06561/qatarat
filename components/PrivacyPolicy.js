function PrivacyPolicy({ language = 'ar' }) {
  try {
    return (
      <div className="max-w-4xl mx-auto" data-name="privacy-policy" data-file="components/PrivacyPolicy.js">
        <div className="card">
          <h1 className="text-3xl font-bold mb-8 text-center">سياسة الخصوصية</h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">مقدمة</h2>
              <p>
                نحن في موقع "قطرات لتبادل الزيارات" نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية. 
                توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك عند استخدام موقعنا.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">المعلومات التي نجمعها</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>اسم المستخدم والبريد الإلكتروني عند التسجيل</li>
                <li>الدولة التي تقيم فيها</li>
                <li>روابط المواقع التي تضيفها للنظام</li>
                <li>سجل الزيارات والنقاط المكتسبة</li>
                <li>عنوان IP وبيانات الجلسة لأغراض الأمان</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">كيف نستخدم معلوماتك</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>تقديم خدمة تبادل الزيارات بشكل فعال</li>
                <li>إدارة حسابك ونقاطك المكتسبة</li>
                <li>التواصل معك بخصوص الخدمة</li>
                <li>تحسين وتطوير الموقع</li>
                <li>ضمان أمان النظام ومنع الاحتيال</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">الاتصال بنا</h2>
              <p className="mb-3">
                إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يمكنك التواصل معنا عبر:
              </p>
              <div className="flex items-center">
                <div className="icon-mail text-blue-600 ml-2"></div>
                <a href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWsLSFHWFrgfjsDDTZgFwrmvFFStGDDMvCgdGTDHjVbrQjRXLnnJZHpjPvtdPMCtgSTmZJNTQ" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-blue-600 hover:underline">
                  attallahg1981@gmail.com
                </a>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">التحديثات</h2>
              <p>
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإشعارك بأي تغييرات مهمة عبر البريد الإلكتروني أو من خلال إشعار على الموقع.
              </p>
              <p className="mt-3 text-sm text-gray-600">
                آخر تحديث: يناير 2025
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PrivacyPolicy component error:', error);
    return null;
  }
}