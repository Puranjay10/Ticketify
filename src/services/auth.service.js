const bcrypt=require("bcrypt");  //hashes pws
const jwt=require("jsonwebtoken"); //creates login tokens
const User=require("../models/user.model");  //

const generateToken=(user)=>{
    return jwt.sign(
        {id: user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );
};

const registerUser=async(data)=>{
    const{name,email,password}=data;

    const existinguser=await User.findOne({email});
    if(existinguser){
        throw new Error("user already exists.");
    }

    const hashedPassword=await bcrypt.hash(password,10);

    const user=await User.create({
        name,
        email,
        password:hashedPassword,
        role: "user",
    });

    return{
        user,
        token:generateToken(user),
    };
};

const loginUser=async(data)=>{
    const{email,password}=data;

    const user=await User.findOne({email});
    if(!user){
        throw new Error("Invalid credentials");
    }

    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error("Invalid credentials");    
    }

    return{
        user,
        token:generateToken(user),
    };
};

module.exports={
    registerUser,
    loginUser,
};