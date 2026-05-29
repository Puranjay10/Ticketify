const { body } = require("express-validator");

const bookTicketValidator = [
  body("eventId")
    .notEmpty()
    .withMessage("Event ID is required"),
];

const verifyTicketValidator = [
  body("ticketCode")
    .notEmpty()
    .withMessage("Ticket code is required"),
];

module.exports = {
  bookTicketValidator,
  verifyTicketValidator,
};