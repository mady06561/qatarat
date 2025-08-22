// utils/api.js
// تم تعديله خصيصًا ليعمل مع قطرات و drv.tw

const scriptURL = "https://script.google.com/macros/s/AKfycbw8VHxL2G3oQOappgwsNcfUM35KobvNfYtEQTV_nZk4O9zER2fWo_VWPDd1SANJ8giQ/exec";

// دالة عامة لإرسال طلب باستخدام GET (الطريقة الوحيدة التي تعمل مع drv.tw)
const trickleRequest = async (action, data = {}) => {
  const params = new URLSearchParams({ action });

  // تحويل البيانات إلى JSON وإضافتها كمعلمة
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      try {
        params.append(key, JSON.stringify(data[key]));
      } catch (e) {
        console.error(`Error in trickleRequest:`, e);
      }
    }
  });

  const url = `${scriptURL}?${params.toString()}`;

  try {
    // استخدام GET فقط
    const response = await fetch(url, {
      method: "GET",
      mode: "no-cors" // ضروري
    });
    return { success: true };
  } catch (error) {
    console.error("trickleRequest failed:", error);
    throw new Error("فشل في الاتصال بالخادم");
  }
};

// دالة للحصول على البيانات (لقراءة القوائم)
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
  // ضمان أن البيانات تحتوي على الحقول الصحيحة
  const cleanData = {};
  if (type === 'user') {
    cleanData.username = data.username || '';
    cleanData.email = data.email || '';
    cleanData.password = data.password || '';
    cleanData.points = data.points || 0;
    cleanData.isAdmin = data.isAdmin || false;
    cleanData.country = data.country || '';
    cleanData.emailVerified = data.emailVerified || false;
  } else {
    Object.assign(cleanData, data);
  }
  return await trickleRequest("create", { type, data: cleanData });
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
