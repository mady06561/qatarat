const StorageUtils = {
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  setCurrentUser: (user) => {
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      console.error('Error setting current user:', error);
    }
  },

  clearCurrentUser: () => {
    try {
      localStorage.removeItem('currentUser');
    } catch (error) {
      console.error('Error clearing current user:', error);
    }
  },

  generateVerificationCode: () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  },

  formatDate: (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ar-SA');
    } catch (error) {
      return 'غير محدد';
    }
  }
};
