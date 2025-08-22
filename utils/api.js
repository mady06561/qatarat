// utils/api.js - الملف المعدل
const scriptURL = "https://script.google.com/macros/s/AKfycbynQrbdtfREukdGi_PWRS-ORAKuqTbowW2U659dG4IdUjtirApr54n5uifuiTUNEwCF/exec";

// دالة عامة لإرسال طلبات POST
const trickleRequest = async (action, data = {}) => {
  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, ...data })
    });
    
    if (!response.ok) throw new Error("Network response was not ok");
    
    const result = await response.json();
    if (!result.success) throw new Error(result.error);
    
    return result.data;
  } catch (error) {
    console.error("trickleRequest error:", error);
    throw new Error("فشل في الاتصال بالخادم: " + error.message);
  }
};

// دالة للحصول على بيانات باستخدام GET
const trickleGetRequest = async (action, params = {}) => {
  try {
    const url = new URL(scriptURL);
    url.searchParams.append('action', action);
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined) {
        url.searchParams.append(key, params[key]);
      }
    });

    const response = await fetch(url, { method: "GET" });
    if (!response.ok) throw new Error("Network response was not ok");
    
    const result = await response.json();
    if (!result.success) throw new Error(result.error);
    
    return result.data;
  } catch (error) {
    console.error("trickleGetRequest error:", error);
    throw new Error("فشل في الاتصال بالخادم: " + error.message);
  }
};

// إنشاء كائن جديد
const trickleCreateObject = async (type, data) => {
  return await trickleRequest("create", { type, data });
};

// قراءة كائن واحد
const trickleGetObject = async (type, id) => {
  return await trickleGetRequest("get", { type, id });
};

// تحديث كائن
const trickleUpdateObject = async (type, id, data) => {
  return await trickleRequest("update", { type, id, data });
};

// حذف كائن
const trickleDeleteObject = async (type, id) => {
  return await trickleRequest("delete", { type, id });
};

// قائمة الكائنات
const trickleListObjects = async (type, limit = 100, activeOnly = false) => {
  return await trickleGetRequest("list", { type, limit, activeOnly: activeOnly.toString() });
};

// تصدير الوظائف إلى window
window.trickleCreateObject = trickleCreateObject;
window.trickleGetObject = trickleGetObject;
window.trickleUpdateObject = trickleUpdateObject;
window.trickleDeleteObject = trickleDeleteObject;
window.trickleListObjects = trickleListObjects;
