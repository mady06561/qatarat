// utils/api.js

const scriptURL = "https://script.google.com/macros/s/AKfycbySvO62_hYRFUxTRprpqq21t5YQYX8i5Qqy69Nq-NdlzylJwzm5AmeWei2gIfpjmzB38A/exec";

// دالة عامة لإرسال طلب باستخدام POST و text/plain
const trickleRequest = async (action, data = {}) => {
  const payload = JSON.stringify({ action, ...data });

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: payload
    });
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
    url.searchParams.append(key, params[key]);
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
