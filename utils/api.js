// utils/api.js

const scriptURL = "https://script.google.com/macros/s/AKfycbxjAGQnOt_ab-bRLXKQ8uUHEK9x6WThCzJZ4A8-1hMl2V6ZDGUJ-hd1pVNiDO_hdlhf1Q/exec";

// دالة عامة لإرسال طلب باستخدام GET (لأن POST لا يعمل على drv.tw)
const trickleRequest = async (action, data = {}) => {
  const params = new URLSearchParams({ action });

  // تحويل البيانات إلى JSON وإضافتها كمعلمات في الرابط
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
    // استخدام GET فقط
    const response = await fetch(url, {
      method: "GET",
      mode: "no-cors"
    });
    return { success: true };
  } catch (error) {
    console.error("trickleRequest error:", error);
    throw new Error("فشل في الاتصال بالخادم");
  }
};

// دالة للحصول على بيانات (قراءة فقط)
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

// الوظائف الأساسية
const trickleCreateObject = async (type, data) => {
  return await trickleRequest("create", { type, data });
};

const trickleGetObject = async (type, id) => {
  const result = await trickleGetRequest("get", { type, id });
  return result?.data || null;
};

const trickleUpdateObject = async (type, id, data) => {
  return await trickleRequest("update", { type, id, data });
};

const trickleDeleteObject = async (type, id) => {
  return await trickleRequest("delete", { type, id });
};

const trickleListObjects = async (type, limit = 100, activeOnly = false) => {
  const result = await trickleGetRequest("list", { type, limit, activeOnly });
  return result || { success: false, items: [] };
};

// تصدير الدوال إلى window
window.trickleCreateObject = trickleCreateObject;
window.trickleGetObject = trickleGetObject;
window.trickleUpdateObject = trickleUpdateObject;
window.trickleDeleteObject = trickleDeleteObject;
window.trickleListObjects = trickleListObjects;
