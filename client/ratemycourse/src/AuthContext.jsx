import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    return auth?.isLoggedIn || false;
  });

  const login = (username) => {
    localStorage.setItem('auth', JSON.stringify({ isLoggedIn: true, username }));
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Consistent named export for the custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
