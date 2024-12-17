import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    username: '',
  });

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth && auth.isLoggedIn) {
      setAuthState(auth);
    }
  }, []);

  const login = (username) => {
    const newAuthState = { isLoggedIn: true, username };
    localStorage.setItem('auth', JSON.stringify(newAuthState));
    setAuthState(newAuthState);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setAuthState({ isLoggedIn: false, username: '' });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
