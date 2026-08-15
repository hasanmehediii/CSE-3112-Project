import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { AuthContext, type UserRole } from "./auth";

function decodeRole(token: string): UserRole | null {
  try {
    const encodedPayload = token.split(".")[1];
    if (!encodedPayload) return null;
    const payload = JSON.parse(atob(encodedPayload.replace(/-/g, "+").replace(/_/g, "/"))) as {
      role?: string;
      exp?: number;
    };
    if (payload.exp && payload.exp * 1000 <= Date.now()) return null;
    return payload.role === "student" || payload.role === "canteen" || payload.role === "admin"
      ? payload.role
      : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    const stored = localStorage.getItem("token");
    if (stored && decodeRole(stored)) return stored;
    localStorage.removeItem("token");
    return null;
  });
  const userRole = useMemo(() => (token ? decodeRole(token) : null), [token]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  const login = useCallback((nextToken: string) => {
    if (!decodeRole(nextToken)) throw new Error("The server returned an invalid or expired session");
    localStorage.setItem("token", nextToken);
    setToken(nextToken);
  }, []);

  useEffect(() => {
    window.addEventListener("khaikhai:unauthorized", logout);
    return () => window.removeEventListener("khaikhai:unauthorized", logout);
  }, [logout]);

  const value = useMemo(() => ({ token, userRole, login, logout }), [login, logout, token, userRole]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
