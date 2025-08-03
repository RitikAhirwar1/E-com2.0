const express =require("express");
const userModel = require("../models/user.model");
const bcrypt =require("bcrypt")

const {loginUser,registerUser,adminLogin} =require("../controllers/userController.js")


const userRoute=express.Router();

userRoute.post("/register",registerUser)
userRoute.post("/login",loginUser)
userRoute.post("/admin",adminLogin)

module.exports=userRoute;