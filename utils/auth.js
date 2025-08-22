const AuthUtils = {
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  validatePassword: (password) => {
    return password && password.length >= 6;
  },

  validateUsername: (username) => {
    return username && username.length >= 3;
  },

  validateUrl: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  hashPassword: (password) => {
    // في التطبيق الحقيقي، يجب استخدام bcrypt أو مكتبة تشفير قوية
    return btoa(password);
  },

  checkPassword: (password, hashedPassword) => {
    return btoa(password) === hashedPassword;
  }
};