/**
 * Shared header navigation — reflects auth state on each page.
 */

async function initNav() {
  const loggedIn = Auth.isLoggedIn();

  document.querySelectorAll("[data-nav-guest]").forEach((el) => {
    el.hidden = loggedIn;
  });

  document.querySelectorAll("[data-nav-auth]").forEach((el) => {
    el.hidden = !loggedIn;
  });

  let role = Auth.getRole();
  if (loggedIn && !role) {
    role = await Auth.syncRole();
  }

  document.querySelectorAll("[data-nav-organizer]").forEach((el) => {
    el.hidden = !(loggedIn && Auth.isOrganizer(role));
  });

  document.querySelectorAll("[data-nav-dashboard]").forEach((el) => {
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
    logoLink.href = loggedIn ? "dashboard.html" : "index.html";
  }

  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path) {
      link.classList.add("active-link");
    }
  });
}

document.addEventListener("DOMContentLoaded", initNav);

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
});
