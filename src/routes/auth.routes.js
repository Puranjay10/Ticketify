const express=require("express");
const router=express.Router();
const protect=require("../middleware/auth.middleware");
const authController=require("../controllers/auth.controller");
const {registerValidator,loginValidator}=require("../validators/auth.validator");
const validate=require("../middleware/validation.middleware");

router.post("/register",registerValidator,validate,authController.register);
router.post("/login",loginValidator,validate,authController.login);
router.get("/profile",protect,authController.getProfile);

module.exports=router;

