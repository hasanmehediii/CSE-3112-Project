const API_BASE = "http://127.0.0.1:8000";

export async function apiRequest(
  path: string,
  options: RequestInit = {},
  token?: string | null
) {
  // Use a plain object for headers to avoid TS issues with HeadersInit
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // If caller passed custom headers, merge them
  if (options.headers) {
    Object.assign(headers, options.headers as Record<string, string>);
  }

  // Add Authorization if token present
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(API_BASE + path, {
    ...options,
    headers, // this is OK: Record<string, string> is a valid HeadersInit
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }

  if (res.status === 204) return null;

  return res.json();
}
