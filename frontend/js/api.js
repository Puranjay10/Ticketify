/**
 * Reusable API helper for Ticketify backend.
 * Automatically attaches JWT from localStorage on protected routes.
 */

const API_BASE = "http://localhost:5000";

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

  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`);
  }

  return data;
}
