/**
 * Auth flows: register and login pages.
 */

// --- Register page ---
const registerForm = document.getElementById("register-form");
if (registerForm) {
  Auth.redirectIfAuthenticated();

  const registerError = document.getElementById("register-error");
  const registerSuccess = document.getElementById("register-success");
  const submitBtn = registerForm.querySelector('button[type="submit"]');

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearStatus(registerError);
    clearStatus(registerSuccess);

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    setButtonLoading(submitBtn, true, "Registering...");

    try {
      const res = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });

      // Success — use backend message when present
      showSuccess(
        registerSuccess,
        res.message || "Registration successful",
      );
      registerForm.querySelectorAll("input, button").forEach((el) => {
        el.disabled = true;
      });

      await delay(1500);
      window.location.href = "login.html";
    } catch (err) {
      showRequestError(registerError, err, "Registration failed.");
      setButtonLoading(submitBtn, false, "Register");
    }
  });
}

// --- Login page ---
const loginForm = document.getElementById("login-form");
if (loginForm) {
  Auth.redirectIfAuthenticated();

  const loginError = document.getElementById("login-error");
  const submitBtn = loginForm.querySelector('button[type="submit"]');

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearStatus(loginError);

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    setButtonLoading(submitBtn, true, "Logging in...");

    try {
      const res = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const token = res.data?.token;
      if (!token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("token", token);

      // Role comes from backend user object — never from frontend input on login
      if (res.data?.user?.role) {
        localStorage.setItem("role", res.data.user.role);
      }

      window.location.href = "dashboard.html";
    } catch (err) {
      showRequestError(loginError, err, "Login failed.");
      setButtonLoading(submitBtn, false, "Login");
    }
  });
}
