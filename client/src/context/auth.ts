import { createContext, useContext } from "react";

export type UserRole = "student" | "canteen" | "admin";
export type AuthContextType = {
  token: string | null;
  userRole: UserRole | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

