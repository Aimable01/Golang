import { ReactNode } from "react";

export interface LoginInputs {
  email: string;
  password: string;
}

export interface SignupInputs {
  username: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}
