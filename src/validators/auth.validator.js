const {body}=require("express-validator");

const registerValidator=[
    body("name")
    .notEmpty()
    .withMessage("Name is required"),
    
    body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
    
    body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({min:6})
    .withMessage("Password must be at least 6 characters long"),
    
    body("role")
    .isIn(["user", "organizer", "admin"])
    .withMessage("Invalid role"),
];

const loginValidator=[
    body("email")
    .isEmail()
    .withMessage("Invalid email address"),
    body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({min:6})
    .withMessage("Password must be at least 6 characters long"),
];

module.exports={
    registerValidator,
    loginValidator,
};