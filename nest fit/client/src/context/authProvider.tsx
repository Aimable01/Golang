import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AuthContextType,
  AuthProviderProps,
  DecodedToken,
} from "../types/auth";
import { jwtDecode } from "jwt-decode";
import { useUserStore } from "../app/stores/userStore";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchCurrentUser } = useUserStore();

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decoded: DecodedToken = jwtDecode(savedToken);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          alert("Your session has expired, please log in again");
          logout();
        } else {
          setToken(savedToken);
          fetchCurrentUser();
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const isAuthPage = window.location.pathname.startsWith("/auth/");
      if (token && isAuthPage) {
        window.location.href = "/";
      } else if (!token && !isAuthPage && window.location.pathname !== "/") {
        window.location.href = "/auth/login";
      }
    }
  }, [token, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
