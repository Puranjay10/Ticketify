const authService=require("../services/auth.service");
const asyncHandler=require("express-async-handler");

const register=asyncHandler(async(req,res)=>{
    const result=await authService.registerUser(req.body);

    res.status(201).json({
        message:"user registered successfully",
        data:result,
    });
});

const login = asyncHandler(async(req,res)=>{
    const result=await authService.loginUser(req.body);

    res.status(200).json({
        message: "Login successful",
        data: result,
    });
});


const getProfile = async(req, res) => {
  res.status(200).json({
    message: "Profile fetched",
    user: req.user,
  });
};

module.exports = {
  register,
  login,
  getProfile,
};
