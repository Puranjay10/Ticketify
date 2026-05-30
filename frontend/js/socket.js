/**
 * Socket.IO — live seat count updates without page refresh.
 * Backend emits: seatUpdated { eventId, availableSeats }
 */

const SOCKET_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://ticketify-2f30.onrender.com";

const socket = io(SOCKET_URL);

function initSeatSocket() {
  if (typeof io === "undefined") {
    console.warn("Socket.IO client not loaded");
    return;
  }

  socket = io(SOCKET_URL);

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("seatUpdated", (payload) => {
    const { eventId, availableSeats } = payload;
    if (!eventId) return;

    // Match event card by MongoDB id string
    const id = String(eventId);
    const card = document.querySelector(`[data-event-id="${id}"]`);
    if (!card) return;

    const seatEl = card.querySelector(".available-seats");
    if (seatEl) {
      seatEl.textContent = availableSeats;
      seatEl.classList.remove("seat-flash");
      // retrigger minimal highlight animation on each realtime update
      void seatEl.offsetWidth;
      seatEl.classList.add("seat-flash");
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
}

// Run on events page when DOM is ready
if (document.getElementById("events-container")) {
  document.addEventListener("DOMContentLoaded", initSeatSocket);
}
