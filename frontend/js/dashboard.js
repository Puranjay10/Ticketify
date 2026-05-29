const dashboardStatus = document.getElementById("dashboard-status");
const dashboardSubtitle = document.getElementById("dashboard-subtitle");
const dashboardRole = document.getElementById("dashboard-role");
const metricsGrid = document.getElementById("metrics-grid");
const organizerPanel = document.getElementById("organizer-panel");
const userActions = document.getElementById("dashboard-user-actions");
const organizerActions = document.getElementById("dashboard-organizer-actions");

const createEventForm = document.getElementById("create-event-form");
const createEventStatus = document.getElementById("create-event-status");
const manageEventsStatus = document.getElementById("manage-events-status");
const manageEventsList = document.getElementById("manage-events-list");
const metricEvents = document.getElementById("metric-events");
const metricTickets = document.getElementById("metric-tickets");
const metricSeats = document.getElementById("metric-seats");

let currentUser = null;

function setMetricValue(el, value) {
  if (!el) return;
  el.textContent = value;
}

function formatDateTime(value) {
  const dt = new Date(value);
  return dt.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function renderManageEvent(event) {
  const item = document.createElement("div");
  item.className = "manage-event-item";
  item.innerHTML = `
    <div>
      <strong>${escapeHtml(event.title)}</strong>
      <p>${escapeHtml(event.venue)} - ${formatDateTime(event.date)}</p>
      <p>Seats: <span>${event.availableSeats}</span> / ${event.totalSeats}</p>
    </div>
    <button class="btn btn-outline btn-small" type="button">Delete</button>
  `;

  const deleteBtn = item.querySelector("button");
  deleteBtn.addEventListener("click", async () => {
    setButtonLoading(deleteBtn, true, "Deleting...");
    try {
      await apiRequest(`/events/${event._id}`, { method: "DELETE" });
      showSuccess(manageEventsStatus, "Event deleted successfully.");
      await loadManageEvents();
    } catch (err) {
      showRequestError(manageEventsStatus, err, "Failed to delete event.");
    } finally {
      setButtonLoading(deleteBtn, false, "Delete");
    }
  });

  return item;
}

async function loadManageEvents() {
  if (!manageEventsList) return;
  manageEventsList.innerHTML = "";
  showLoading(manageEventsStatus, "Loading events...");

  try {
    const res = await apiRequest("/events");
    const allEvents = res.data || [];
    const visibleEvents =
      currentUser?.role === "admin"
        ? allEvents
        : allEvents.filter(
            (event) =>
              String(event.organizerId?._id || event.organizerId) ===
              String(currentUser?._id)
          );

    if (visibleEvents.length === 0) {
      manageEventsList.innerHTML =
        '<p class="empty-state small">No events created yet.</p>';
      clearStatus(manageEventsStatus);
      return;
    }

    visibleEvents.forEach((event) => {
      manageEventsList.appendChild(renderManageEvent(event));
    });
    clearStatus(manageEventsStatus);
  } catch (err) {
    showRequestError(manageEventsStatus, err, "Could not load events.");
  }
}

function initCreateEvent() {
  if (!createEventForm) return;
  const submitBtn = createEventForm.querySelector('button[type="submit"]');

  createEventForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearStatus(createEventStatus);

    const payload = {
      title: document.getElementById("event-title").value.trim(),
      description: document.getElementById("event-description").value.trim(),
      date: document.getElementById("event-date").value,
      venue: document.getElementById("event-venue").value.trim(),
      totalSeats: Number(document.getElementById("event-seats").value),
    };

    setButtonLoading(submitBtn, true, "Creating...");
    try {
      await apiRequest("/events", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      showSuccess(createEventStatus, "Event created successfully.");
      createEventForm.reset();
      await loadManageEvents();
    } catch (err) {
      showRequestError(createEventStatus, err, "Event creation failed.");
    } finally {
      setButtonLoading(submitBtn, false, "Create Event");
    }
  });
}

async function initDashboard() {
  if (!Auth.requireAuth()) return;

  try {
    const [profileRes, eventsRes, myTicketsRes] = await Promise.all([
      apiRequest("/auth/profile"),
      apiRequest("/events"),
      apiRequest("/tickets/my"),
    ]);

    currentUser = profileRes.user;
    const allEvents = eventsRes.data || [];
    const myTickets = myTicketsRes.data || [];

    if (currentUser?.role) {
      localStorage.setItem("role", currentUser.role);
    }

    const name = currentUser?.name || "there";
    dashboardSubtitle.textContent = `Welcome back, ${name}.`;

    if (dashboardRole && currentUser?.role) {
      dashboardRole.textContent = currentUser.role;
      dashboardRole.hidden = false;
    }

    clearStatus(dashboardStatus);
    metricsGrid.hidden = false;

    if (Auth.isOrganizer(currentUser?.role)) {
      if (userActions) userActions.hidden = true;
      if (organizerActions) organizerActions.hidden = false;
      organizerPanel.hidden = false;
      initCreateEvent();
      await loadManageEvents();
    } else {
      if (userActions) userActions.hidden = false;
      if (organizerActions) organizerActions.hidden = true;
    }

    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }

    const scopeEvents =
      currentUser?.role === "admin"
        ? allEvents
        : Auth.isOrganizer(currentUser?.role)
        ? allEvents.filter(
            (event) =>
              String(event.organizerId?._id || event.organizerId) ===
              String(currentUser?._id)
          )
        : allEvents;

    const seatsRemaining = scopeEvents.reduce(
      (sum, event) => sum + Number(event.availableSeats || 0),
      0
    );

    setMetricValue(metricEvents, scopeEvents.length);
    setMetricValue(metricTickets, myTickets.length);
    setMetricValue(metricSeats, seatsRemaining);
  } catch (err) {
    showRequestError(dashboardStatus, err, "Could not load dashboard.");
  }
}

initDashboard();
