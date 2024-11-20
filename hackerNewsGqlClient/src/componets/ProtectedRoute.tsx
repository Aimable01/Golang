import React, { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const authContext = useContext(AuthContext);
  if (!authContext?.token) return <Navigate to={"/login"} replace />;
  return children;
};

export default ProtectedRoute;
