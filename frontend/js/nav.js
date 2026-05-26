/**
 * Shared header navigation — reflects auth state on each page.
 */

function initNav() {
  const loggedIn = Auth.isLoggedIn();

  document.querySelectorAll("[data-nav-guest]").forEach((el) => {
    el.hidden = loggedIn;
  });

  document.querySelectorAll("[data-nav-auth]").forEach((el) => {
    el.hidden = !loggedIn;
  });

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      Auth.logout();
    });
  }

  const logoLink = document.querySelector("header .logo-link");
  if (logoLink) {
    logoLink.href = loggedIn ? "index.html" : "home.html";
  }
}

document.addEventListener("DOMContentLoaded", initNav);
