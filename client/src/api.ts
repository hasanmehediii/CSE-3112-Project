const API_BASE = (import.meta.env.VITE_BACKEND_URL ?? "http://127.0.0.1:8000").replace(/\/$/, "");
const REQUEST_TIMEOUT_MS = 15_000;

type ErrorEnvelope = {
  error?: { message?: string; code?: string };
  detail?: string;
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(
    message: string,
    status: number,
    code = "request_failed",
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function apiRequest<T = unknown>(
  path: string,
  options: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const headers = new Headers(options.headers);
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(API_BASE + path, {
      ...options,
      headers,
      signal: options.signal ?? controller.signal,
    });
    if (response.status === 401) window.dispatchEvent(new Event("khaikhai:unauthorized"));
    if (!response.ok) {
      let payload: ErrorEnvelope = {};
      try {
        payload = (await response.json()) as ErrorEnvelope;
      } catch {
        // Non-JSON server errors use the status text below.
      }
      throw new ApiError(
        payload.error?.message ?? payload.detail ?? response.statusText ?? "Request failed",
        response.status,
        payload.error?.code,
      );
    }
    if (response.status === 204) return null as T;
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("The server took too long to respond. Please try again.", 408, "timeout");
    }
    if (error instanceof TypeError) {
      throw new ApiError("Unable to reach the server. Check your connection.", 0, "network_error");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}
