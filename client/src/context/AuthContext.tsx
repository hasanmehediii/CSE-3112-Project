import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  userRole: "student" | "canteen" | "admin" | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"student" | "canteen" | "admin" | null>(
    null
  );

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      applyToken(stored);
    }
  }, []);

  const applyToken = (jwt: string) => {
    setToken(jwt);
    localStorage.setItem("token", jwt);

    try {
      const payload = JSON.parse(atob(jwt.split(".")[1]));
      const role = payload.role as "student" | "canteen" | "admin" | undefined;
      if (role) setUserRole(role);
    } catch (e) {
      console.error("Failed to decode token", e);
      setUserRole(null);
    }
  };

  const login = (jwt: string) => {
    applyToken(jwt);
  };

  const logout = () => {
    setToken(null);
    setUserRole(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
