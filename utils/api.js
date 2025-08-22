// utils/api.js - إصدار مبسط
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwUb43fwBWeZ2ns0J9k74HgoKGTw0Ahv_MIkqD-stnE-etEKqg2W6JC9qqDQu2olKk/exec";

class API {
  constructor() {
    this.baseURL = SCRIPT_URL;
  }

  async request(endpoint, options = {}) {
    try {
      const url = this.baseURL;
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: JSON.stringify({ ...options.body, endpoint })
      };

      console.log('Sending request to:', url);
      console.log('Request data:', config.body);

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Response received:', result);

      if (!result.success) {
        throw new Error(result.error || 'Request failed');
      }

      return result.data;

    } catch (error) {
      console.error('API request failed:', error);
      throw new Error(`فشل في الاتصال: ${error.message}`);
    }
  }

  async createObject(type, data) {
    return this.request('', {
      body: { action: 'create', type, data }
    });
  }

  async listObjects(type, limit = 100) {
    return this.request('', {
      body: { action: 'list', type, limit }
    });
  }

  async testConnection() {
    try {
      const response = await this.listObjects('user', 1);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// إنشاء instance واحد للAPI
const api = new API();

// تصدير الدوال للاستخدام العالمي
window.trickleCreateObject = api.createObject.bind(api);
window.trickleListObjects = api.listObjects.bind(api);
window.testAPIConnection = api.testConnection.bind(api);
