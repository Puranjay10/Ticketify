const express=require("express");
const router=express.Router();
const protect=require("../middleware/auth.middleware");
const authController=require("../controllers/auth.controller");

router.post("/register",authController.register);
router.post("/login",authController.login);
router.get("/profile",protect,authController.getProfile);

module.exports=router;

