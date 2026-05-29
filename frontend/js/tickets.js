/**
 * My tickets page + organizer ticket verification.
 */

const ticketsList = document.getElementById("tickets-list");
const ticketsError = document.getElementById("tickets-error");
const ticketsLoading = document.getElementById("tickets-loading");
const verifySection = document.getElementById("verify-section");

function renderTicket(ticket) {
  const event = ticket.eventId || {};
  const title = event.title || "Unknown event";
  const statusValue = (ticket.status || "").toLowerCase();
  const statusLabel = statusValue === "used" ? "USED / VERIFIED" : "ACTIVE";
  const item = document.createElement("div");
  item.className = "ticket-item";

  item.innerHTML = `
    <div class="ticket-head">
      <h3><i data-lucide="ticket" class="icon-inline"></i> ${escapeHtml(title)}</h3>
      <span class="status ${statusValue}">${escapeHtml(statusLabel)}</span>
    </div>
    <p class="ticket-code">Code: <code>${escapeHtml(ticket.ticketCode)}</code></p>
    ${ticket.qrCode ? `<p class="meta"><i data-lucide="qr-code" class="icon-inline"></i> QR Pass</p><img src="${ticket.qrCode}" alt="Ticket QR">` : ""}
  `;

  return item;
}

function applyRoleUI(role) {
  if (!verifySection) return;

  if (Auth.isOrganizer(role)) {
    verifySection.hidden = false;
  } else {
    verifySection.hidden = true;
    verifySection.remove();
  }
}

async function loadMyTickets() {
  if (!ticketsList) return;

  clearStatus(ticketsError);
  if (ticketsLoading) ticketsLoading.hidden = false;

  try {
    const res = await apiRequest("/tickets/my");
    const tickets = res.data || [];

    ticketsList.innerHTML = "";

    if (tickets.length === 0) {
      ticketsList.innerHTML =
        '<p class="empty-state">No tickets booked yet.</p>';
      return;
    }

    tickets.forEach((t) => ticketsList.appendChild(renderTicket(t)));
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  } catch (err) {
    showRequestError(ticketsError, err, "Could not load tickets.");
  } finally {
    if (ticketsLoading) ticketsLoading.hidden = true;
  }
}

// --- Verify ticket (organizer / admin only) ---
const verifyForm = document.getElementById("verify-form");
if (verifyForm) {
  const verifyResult = document.getElementById("verify-result");
  const verifyBtn = verifyForm.querySelector('button[type="submit"]');

  verifyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearStatus(verifyResult);

    const ticketCode = document.getElementById("verify-code").value.trim();
    if (!ticketCode) return;

    setButtonLoading(verifyBtn, true, "Verifying...");

    try {
      await apiRequest("/tickets/verify", {
        method: "POST",
        body: JSON.stringify({ ticketCode }),
      });
      showSuccess(verifyResult, "Ticket verified successfully.");
      verifyForm.reset();
    } catch (err) {
      const msg = err?.message || "Verification failed";
      let display = msg;

      if (msg.toLowerCase().includes("already used")) {
        display = "Already used — this ticket was scanned before.";
      } else if (msg.toLowerCase().includes("invalid")) {
        display = "Invalid ticket — code not found.";
      }

      if (display !== msg) {
        showError(verifyResult, display);
      } else {
        showRequestError(verifyResult, err, "Verification failed.");
      }
    } finally {
      setButtonLoading(verifyBtn, false, "Verify");
    }
  });
}

async function initTicketsPage() {
  if (!ticketsList) return;
  if (!Auth.requireAuth()) return;

  const role = await Auth.syncRole();
  applyRoleUI(role);
  loadMyTickets();
}

initTicketsPage();
