const { body } = require("express-validator");

const createEventValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("date")
    .notEmpty()
    .withMessage("Date is required"),

  body("venue")
    .notEmpty()
    .withMessage("Venue is required"),

  body("totalSeats")
    .isInt({ min: 1 })
    .withMessage("Total seats must be at least 1"),
];

module.exports = {
  createEventValidator,
};