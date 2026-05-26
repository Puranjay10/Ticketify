const authService=require("../services/auth.service");

const register=async(req,res)=>{
    try{
        const result=await authService.registerUser(req.body);

        res.status(201).json({
            message:"user registered successfully",
            data:result,
        });
    }catch(error){
        res.status(400).json({
            message:error.message,
        });
    }
};

const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);

    res.status(200).json({
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};


const getProfile = async (req, res) => {
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
