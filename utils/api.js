// utils/api.js
// تم تعديله للعمل مع GitHub Pages

const scriptURL = "https://script.google.com/macros/s/AKfycbynQrbdtfREukdGi_PWRS-ORAKuqTbowW2U659dG4IdUjtirApr54n5uifuiTUNEwCF/exec";

// دالة عامة لإرسال طلب باستخدام POST و text/plain (طريقة ناجحة)
const trickleRequest = async (action, data = {}) => {
  const payload = JSON.stringify({ action, ...data });

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: payload
    });
    // لا نستخدم mode: "no-cors" هنا لأن GitHub Pages يدعم CORS جزئيًا
    return { success: true };
  } catch (error) {
    console.error("trickleRequest error:", error);
    throw new Error("فشل في الاتصال بالخادم");
  }
};

// دالة للقراءة باستخدام GET
const trickleGetRequest = async (action, params = {}) => {
  const url = new URL(scriptURL);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined) {
      url.searchParams.append(key, params[key]);
    }
  });

  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) throw new Error("Network error");
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

// تصدير الدوال
window.trickleCreateObject = trickleCreateObject;
window.trickleGetObject = trickleGetObject;
window.trickleUpdateObject = trickleUpdateObject;
window.trickleDeleteObject = trickleDeleteObject;
window.trickleListObjects = trickleListObjects;
