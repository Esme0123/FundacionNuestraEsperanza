"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. Definimos la forma de los datos del usuario y del contexto
interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// 2. Creamos el Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Creamos el Proveedor (Provider)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Para saber si ya revisamos localStorage

  // 4. Al cargar la app, revisamos si hay datos en localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Failed to parse auth from localStorage", error);
      // Si falla (ej. JSON malformado), limpiamos todo
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    setIsLoading(false); // Terminamos de cargar
  }, []);

  // 5. Funciones de Login y Logout
  const login = (userData: User, userToken: string) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 6. Creamos un "Hook" personalizado para usar el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};