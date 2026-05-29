/**
 * Events page: list events, book tickets, show QR after booking.
 */

const eventsContainer = document.getElementById("events-container");
const eventsError = document.getElementById("events-error");
const eventsLoading = document.getElementById("events-loading");

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function renderEventCard(event) {
  const id = event._id;
  const card = document.createElement("article");
  card.className = "event-card";
  card.setAttribute("data-event-id", id);

  card.innerHTML = `
    <h3>${escapeHtml(event.title)}</h3>
    <p class="meta"><i data-lucide="map-pin" class="icon-inline"></i> ${escapeHtml(event.venue)}</p>
    <p class="meta"><i data-lucide="calendar-days" class="icon-inline"></i> ${formatDate(event.date)}</p>
    <p class="seats">
      <i data-lucide="ticket" class="icon-inline"></i> Seats available: <span class="available-seats">${event.availableSeats}</span>
      / ${event.totalSeats}
    </p>
    <button type="button" class="btn book-btn">Book Ticket</button>
    <p class="book-status status-msg" hidden></p>
    <div class="booking-result" hidden></div>
  `;

  const bookBtn = card.querySelector(".book-btn");
  bookBtn.addEventListener("click", () => handleBook(id, card));

  return card;
}

async function loadEvents() {
  if (!eventsContainer) return;

  clearStatus(eventsError);
  if (eventsLoading) eventsLoading.hidden = false;

  try {
    const res = await apiRequest("/events");
    const events = res.data || [];

    eventsContainer.innerHTML = "";

    if (events.length === 0) {
      eventsContainer.innerHTML =
        '<p class="empty-state">No events available.</p>';
      return;
    }

    events.forEach((ev) => {
      eventsContainer.appendChild(renderEventCard(ev));
    });
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  } catch (err) {
    showRequestError(eventsError, err, "Could not load events.");
  } finally {
    if (eventsLoading) eventsLoading.hidden = true;
  }
}

async function handleBook(eventId, card) {
  const resultBox = card.querySelector(".booking-result");
  const bookStatus = card.querySelector(".book-status");
  const bookBtn = card.querySelector(".book-btn");

  clearStatus(bookStatus);
  resultBox.hidden = true;

  setButtonLoading(bookBtn, true, "Booking...");

  try {
    const res = await apiRequest("/tickets/book", {
      method: "POST",
      body: JSON.stringify({ eventId }),
    });

    const ticket = res.data;
    resultBox.innerHTML = `
      <strong>Ticket booked successfully.</strong><br>
      Ticket code: <code>${escapeHtml(ticket.ticketCode)}</code>
      ${ticket.qrCode ? `<img src="${ticket.qrCode}" alt="Ticket QR code">` : ""}
    `;
    resultBox.hidden = false;

    const seatEl = card.querySelector(".available-seats");
    if (seatEl && ticket.eventId?.availableSeats != null) {
      seatEl.textContent = ticket.eventId.availableSeats;
    }
  } catch (err) {
    showRequestError(bookStatus, err, "Booking failed.");
  } finally {
    setButtonLoading(bookBtn, false, "Book Ticket");
  }
}

async function initEventsPage() {
  if (!eventsContainer) return;
  if (!Auth.requireAuth()) return;

  await Auth.syncRole();
  loadEvents();
}

initEventsPage();
