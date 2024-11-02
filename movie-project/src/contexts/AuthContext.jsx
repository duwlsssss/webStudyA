import React, { useState, useMemo, createContext, useContext, useCallback, useEffect } from 'react';

const AuthValueContext = createContext(null);
const AuthActionContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // login 함수와 logout 함수를 useCallback으로 메모이제이션
  const login = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
  }, [user]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, []);

  const actions = useMemo(() => ({ login, logout }), [login, logout]);


  return (
    <AuthActionContext.Provider value={actions}>
      <AuthValueContext.Provider value={user}>
        {children}
      </AuthValueContext.Provider>
    </AuthActionContext.Provider>
  );
};

function useUserAuthValue() {
  const value = useContext(AuthValueContext);
  if (value === undefined) {
    throw new Error('useUserAuthValue must be used within AuthProvider');
  }
  return value;
}

function useUserAuthAction() {
  const value = useContext(AuthActionContext);
  if (value === undefined) {
    throw new Error('useUserAuthAction must be used within AuthProvider');
  }
  return value;
}

export { AuthProvider, useUserAuthValue, useUserAuthAction };
