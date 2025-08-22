function PublicLinks() {
  const [websites, setWebsites] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadWebsites();
  }, []);

  const loadWebsites = async () => {
    try {
      const websitesData = await trickleListObjects('website', 100, true);
      const activeWebsites = websitesData.items.filter(w => w.objectData.isActive);
      setWebsites(activeWebsites);
    } catch (error) {
      console.error('Error loading websites:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="text-center">جاري التحميل...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-center">جميع الروابط وأكواد التحقق</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-right p-4 font-semibold text-lg">الرابط</th>
                <th className="text-right p-4 font-semibold text-lg">كود التحقق</th>
              </tr>
            </thead>
            <tbody>
              {websites.map((website, index) => (
                <tr key={website.objectId} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="p-4">
                    <a 
                      href={website.objectData.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                    >
                      {website.objectData.url}
                    </a>
                  </td>
                  <td className="p-4">
                    <span className="font-mono bg-gray-100 px-3 py-1 rounded border">
                      {website.objectData.verificationCode}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {websites.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            لا توجد مواقع نشطة حالياً
          </div>
        )}
      </div>
    </div>
  );
}