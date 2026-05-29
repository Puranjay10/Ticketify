/**
 * Reusable API helper for Ticketify backend.
 * Automatically attaches JWT from localStorage on protected routes.
 */

const API_BASE = "http://localhost:5000";

class ApiError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "ApiError";
    this.validationErrors = options.validationErrors || [];
    this.status = options.status || null;
  }
}

/**
 * Generic fetch wrapper — parses JSON and throws on error responses.
 */
async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // Attach Bearer token when present (protected endpoints)
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    /* non-JSON body */
  }

  const validationErrors = Array.isArray(data.errors)
    ? data.errors
        .map((err) => err?.msg)
        .filter(Boolean)
    : [];

  const isFailurePayload = data && data.success === false;
  const hasErrorStatus = !response.ok;

  if (hasErrorStatus || isFailurePayload) {
    const message =
      data.message ||
      validationErrors[0] ||
      `Request failed (${response.status})`;

    throw new ApiError(message, {
      validationErrors,
      status: response.status,
    });
  }

  return data;
}
