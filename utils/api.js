// utils/api.js - الملف المعدل مع معالجة أخطاء محسنة
const scriptURL = "https://script.google.com/macros/s/AKfycbynQrbdtfREukdGi_PWRS-ORAKuqTbowW2U659dG4IdUjtirApr54n5uifuiTUNEwCF/exec";

// دالة مساعدة للطلب
async function makeRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(options.body),
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Request failed');
    }

    return result.data;
  } catch (error) {
    console.error('API Request failed:', error);
    throw new Error(`فشل في الاتصال بالخادم: ${error.message}`);
  }
}

// دالة للطلبات GET
async function makeGetRequest(url, params = {}) {
  try {
    const urlObj = new URL(url);
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        urlObj.searchParams.append(key, params[key]);
      }
    });

    const response = await fetch(urlObj.toString());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Request failed');
    }

    return result.data;
  } catch (error) {
    console.error('API GET Request failed:', error);
    throw new Error(`فشل في الاتصال بالخادم: ${error.message}`);
  }
}

// إنشاء كائن جديد
const trickleCreateObject = async (type, data) => {
  return await makeRequest(scriptURL, {
    body: { action: 'create', type, data }
  });
};

// قراءة كائن واحد
const trickleGetObject = async (type, id) => {
  return await makeGetRequest(scriptURL, {
    action: 'get',
    type,
    id
  });
};

// تحديث كائن
const trickleUpdateObject = async (type, id, data) => {
  return await makeRequest(scriptURL, {
    body: { action: 'update', type, id, data }
  });
};

// حذف كائن
const trickleDeleteObject = async (type, id) => {
  return await makeRequest(scriptURL, {
    body: { action: 'delete', type, id }
  });
};

// قائمة الكائنات
const trickleListObjects = async (type, limit = 100, activeOnly = false) => {
  return await makeGetRequest(scriptURL, {
    action: 'list',
    type,
    limit: limit.toString(),
    activeOnly: activeOnly.toString()
  });
};

// اختبار الاتصال
const testConnection = async () => {
  try {
    const response = await makeGetRequest(scriptURL, {
      action: 'list',
      type: 'user',
      limit: '1'
    });
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// تصدير الوظائف إلى window
window.trickleCreateObject = trickleCreateObject;
window.trickleGetObject = trickleGetObject;
window.trickleUpdateObject = trickleUpdateObject;
window.trickleDeleteObject = trickleDeleteObject;
window.trickleListObjects = trickleListObjects;
window.testConnection = testConnection;
