const userModel=require("../models/userModels")
const bcrypt =require("bcrypt");
//create user/register user
exports.registerController=async(req,res)=>{
    try{
        const {username,email,password}=req.body;   //only token is in header otherwise the everthing which is visible data is in body.
        //validation
        if(!username || !email || !password){
            return res.status(500).send({
                success:false,
                message:"Please fill the required fields"
            })  
        }
        //if user is already exists
        const existingUser=await userModel.findOne({email});
        if(existingUser){
            res.status(401).send({
                success:false,
                message:"User already exists"
            })
        }
        //hashing password for security purposes
        const hashedPassword=await bcrypt.hash(password,10);
        //saving new user
        const user=new userModel({username,email,password:hashedPassword});
        await user.save();
        return res.status(201).send({
            success:true,
            message:"New user is creataed",
            user
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            message:'Error In register callback',
            success:false,
            error
        })
    }
};

//get all users
exports.getAllUsers=async(req,res)=>{
    try{
            const users=await userModel.find({})
            res.status(200).send({
                userCount:users.length,
                success:true,
                message:"Data of all users",
                users
            })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in get all users",
            error
        })
    }
};



//Login
exports.loginController=async(req,res)=>{
    try{
        const {email,password}=req.body;
        //validation
        if(!email || !password){
            return res.status(401).send({
                success:false,
                message:"Please provide valid email or password"
            });
        } 
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(200).send({
                success:false,
                message:"Email is not registered"
            })
        }
        //password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:"Invalid username or password"
            })
        }
        return res.status(200).send({
            success:true,
            message:"Login Successfully",
            user
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in login callback",
            error
        })

    }
};
