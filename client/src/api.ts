// src/api.ts
const API_BASE = import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:8000";

export async function apiRequest(
  path: string,
  options: RequestInit = {},
  token?: string | null
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.headers) {
    Object.assign(headers, options.headers as Record<string, string>);
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(API_BASE + path, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }

  if (res.status === 204) return null;

  return res.json();
}
