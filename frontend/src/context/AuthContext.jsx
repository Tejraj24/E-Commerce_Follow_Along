import React, { createContext, useState, useEffect } from 'react';
import userService from '../services/userService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  const login = async (email, password) => {
    const data = await userService.login({ email, password });
    if (data?.user) {
      setCurrentUser(data.user);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
    }
    if (data?.token) {
      setToken(data.token);
      localStorage.setItem('token', data.token);
    }
    return data;
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
