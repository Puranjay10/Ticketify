/**
 * Shared frontend helpers — auth, UI status, loading states.
 */

const Auth = {
  getToken() {
    return localStorage.getItem("token");
  },

  setSession(token, user) {
    localStorage.setItem("token", token);
    if (user?.role) {
      localStorage.setItem("role", user.role);
    }
  },

  clearSession() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  },

  isLoggedIn() {
    return !!this.getToken();
  },

  logout() {
    this.clearSession();
    window.location.href = "home.html";
  },

  /** Redirect guests away from protected pages. */
  requireAuth(redirectTo = "login.html") {
    if (!this.isLoggedIn()) {
      window.location.href = redirectTo;
      return false;
    }
    return true;
  },

  /** Redirect logged-in users away from login/register. */
  redirectIfAuthenticated(redirectTo = "index.html") {
    if (this.isLoggedIn()) {
      window.location.href = redirectTo;
      return true;
    }
    return false;
  },

  getRole() {
    return localStorage.getItem("role");
  },

  isOrganizer(role = this.getRole()) {
    return role === "organizer" || role === "admin";
  },

  /** Refresh role from backend profile (source of truth). */
  async syncRole() {
    if (!this.isLoggedIn()) return null;
    try {
      const res = await apiRequest("/auth/profile");
      const role = res.user?.role;
      if (role) localStorage.setItem("role", role);
      return role;
    } catch {
      this.clearSession();
      window.location.href = "login.html";
      return null;
    }
  },
};

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

/** Inline status: success | error | loading */
function showStatus(el, message, type = "error") {
  if (!el) return;
  el.textContent = message;
  el.className = `status-msg ${type}`;
  el.hidden = !message;
}

function clearStatus(el) {
  if (!el) return;
  el.textContent = "";
  el.hidden = true;
  el.className = "status-msg";
}

function setButtonLoading(btn, isLoading, loadingLabel) {
  if (!btn) return;
  if (isLoading) {
    if (!btn.dataset.originalText) {
      btn.dataset.originalText = btn.textContent;
    }
    btn.disabled = true;
    btn.textContent = loadingLabel;
  } else {
    btn.disabled = false;
    btn.textContent = btn.dataset.originalText || btn.textContent;
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
