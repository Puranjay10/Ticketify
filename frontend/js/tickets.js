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
  const item = document.createElement("div");
  item.className = "ticket-item";

  item.innerHTML = `
    <h3>${escapeHtml(title)}</h3>
    <p>Code: <code>${escapeHtml(ticket.ticketCode)}</code></p>
    <span class="status ${ticket.status}">${escapeHtml(ticket.status)}</span>
    ${ticket.qrCode ? `<img src="${ticket.qrCode}" alt="Ticket QR">` : ""}
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
  } catch (err) {
    showStatus(ticketsError, err.message, "error");
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
      showStatus(verifyResult, "Verified successfully.", "success");
      verifyForm.reset();
    } catch (err) {
      const msg = err.message || "Verification failed";
      let display = msg;

      if (msg.toLowerCase().includes("already used")) {
        display = "Already used — this ticket was scanned before.";
      } else if (msg.toLowerCase().includes("invalid")) {
        display = "Invalid ticket — code not found.";
      }

      showStatus(verifyResult, display, "error");
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
