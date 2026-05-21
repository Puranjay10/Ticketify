const express = require("express");
const router = express.Router();
const authorizeRoles = require("../middleware/role.middleware");

const ticketController = require("../controllers/ticket.controller");
const protect = require("../middleware/auth.middleware");

// Book ticket
router.post("/book", protect, ticketController.bookTicket);

// Get my tickets
router.get("/my", protect, ticketController.getMyTickets);

//verify ticket
router.post(
  "/verify",
  protect,
  authorizeRoles("organizer", "admin"),
  ticketController.verifyTicket
);

module.exports = router;