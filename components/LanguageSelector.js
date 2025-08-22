function LanguageSelector({ language, onLanguageChange }) {
  try {
    return (
      <div className="relative" data-name="language-selector" data-file="components/LanguageSelector.js">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-transparent border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="ar">العربية</option>
          <option value="en">English</option>
        </select>
      </div>
    );
  } catch (error) {
    console.error('LanguageSelector component error:', error);
    return null;
  }
}