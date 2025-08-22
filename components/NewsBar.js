function NewsBar({ language = 'ar' }) {
  try {
    return (
      <div className="bg-yellow-400 text-gray-900 py-2" data-name="news-bar" data-file="components/NewsBar.js">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="icon-bell text-lg ml-2"></div>
            <span className="font-medium">
              {t('newsTitle', language)}: {t('newsContent', language)}
            </span>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('NewsBar component error:', error);
    return null;
  }
}