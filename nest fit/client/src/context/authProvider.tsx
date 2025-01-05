import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthProviderProps } from "../types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (token && window.location.pathname === "/auth/login") {
        window.location.href = "/";
      } else if (!token && window.location.pathname !== "/auth/login") {
        window.location.href = "/auth/login";
      }
    }
  }, [token, isLoading]);

  if (isLoading) {
    return null;
  }

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
