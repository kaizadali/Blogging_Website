const mongoose =require("mongoose");

const blogSchema=new mongoose.Schema({
    title:{
        type:"string",
        require:[true,"Title is required"]
    },
    description:{
        type:"string",
        require:[true,"Description is required"]
    },
    image:{
        type:"string",
        require:[true,"Image is required"]
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:[true,"User id is required"]
    }
},{timestamps:true})

const blogModel=mongoose.model('Blog',blogSchema);
module.exports=blogModel;