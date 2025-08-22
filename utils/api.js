// utils/api.js

const scriptURL = "https://script.google.com/macros/s/AKfycbyMtZVLu3gr2tZ2MlT3y3QQmBq6weYROju8dnsX65AgIhfmZ_pevds-9wHVbp-9_wiA/exec";

// دالة عامة لإرسال طلب باستخدام GET (لأن POST لا يعمل على drv.tw)
const trickleRequest = async (action, data = {}) => {
  const params = new URLSearchParams({ action });
  
  // تحويل البيانات إلى JSON ووضعها في الرابط
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      try {
        params.append(key, JSON.stringify(data[key]));
      } catch (e) {
        console.error(`Error stringifying ${key}:`, e);
      }
    }
  });

  const url = `${scriptURL}?${params.toString()}`;

  try {
    // استخدام fetch مع GET
    const response = await fetch(url, {
      method: "GET",
      mode: "no-cors" // ضروري لأن Google Apps Script لا يدعم CORS
    });
    // لا يمكن قراءة الاستجابة بسبب no-cors، لكن الطلب يُرسل
    return { success: true };
  } catch (error) {
    console.error("trickleRequest error:", error);
    throw new Error("فشل في الاتصال بالخادم");
  }
};

// دالة للحصول على بيانات باستخدام GET (لقراءة البيانات فقط)
const trickleGetRequest = async (action, params = {}) => {
  const url = new URL(scriptURL);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined) {
      url.searchParams.append(key, params[key]);
    }
  });

  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("trickleGetRequest error:", error);
    return null;
  }
};

// إنشاء كائن جديد
const trickleCreateObject = async (type, data) => {
  return await trickleRequest("create", { type, data });
};

// قراءة كائن واحد
const trickleGetObject = async (type, id) => {
  const result = await trickleGetRequest("get", { type, id });
  return result?.data || null;
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
  const result = await trickleGetRequest("list", { type, limit, activeOnly });
  return result || { success: false, items: [] };
};

// تصدير الوظائف إلى window
window.trickleCreateObject = trickleCreateObject;
window.trickleGetObject = trickleGetObject;
window.trickleUpdateObject = trickleUpdateObject;
window.trickleDeleteObject = trickleDeleteObject;
window.trickleListObjects = trickleListObjects;
