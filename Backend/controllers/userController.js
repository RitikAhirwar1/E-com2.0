const userModel = require("../models/user.model");
const validator=require("validator")
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")



//Create Token Function
const createToken =(id)=>{
return jwt.sign({id},process.env.JWT_SECRET_KEY)
}

// Route for user login 
const loginUser = async (req, res) => {
    try {
        const {email,password} =req.body;
        //Check email exist or not
        const user = await userModel.findOne({email})
        if(!user){
            return res.send({success:false,msg:"Enter Correct email ,This email is not exist"})
        }
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token=createToken(user._id)
                res.send({success:true,msg:"Login Successfully..",token})
            }else{
                res.send({success:false,msg:"Invalid credentials"})
            }
        })

    } catch (error) {
        console.log(error)
        res.send({success:false,msg:error.message})
        
    }

}

// Route for user register 
const registerUser = async (req, res) => {
    try {
        const {name,password,email} =req.body;

        const existingUser= await userModel.findOne({email})
        if(existingUser){
            return  res.send({success:false,msg:"User is already Exist"})
        }
//validation email formate & strong password
        if(!validator.isEmail(email)){
            return res.send({success:false,msg:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.send({success:false,msg:"Please Enter strong password"})
        }
        const hashPassword= await bcrypt.hash(password,10)
        const hashUser=new userModel({name,email,password:hashPassword})
        const user=await hashUser.save();

        const token= createToken(user._id)

        res.send({success:true,msg:"User register Successfully..",token})

        
    } catch (error) {
        console.log(error)
        res.send({success:false,msg:"user is not registered....",err:error.message})
        
    }

}

//Admin Login
const adminLogin =async(req,res)=>{
try {
    const {email,password} = req.body

    if(email===process.env.ADMIN_EMAIL && password ===process.env.ADMIN_PASSWORD){
        const token =jwt.sign(email+password,process.env.JWT_SECRET_KEY)
        res.send({success:true,token})
    }else{
        res.send({success:false,msg:"Invalid user you are not admin"})
    }
} catch (error) {
    console.log(error)
    res.send({success:false,msg:error.message})
    
}
}

module.exports = { loginUser, registerUser ,adminLogin }