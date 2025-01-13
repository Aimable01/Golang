import { ReactNode } from "react";

export interface User {
  name: string;
  username: string;
  profilePicture: string;
}

export interface LoginInputs {
  usernameOrEmail: string;
  password: string;
}

export interface SignupInputs {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface DecodedToken {
  exp: number;
}
