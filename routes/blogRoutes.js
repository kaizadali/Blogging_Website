const express =require("express");
const { getAllBlogsController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogByIdController, userBlogController } = require("../controllers/blogControllers");

//router object
const router=express.Router();

//routes

//get || all-blog
router.get('/all-blog',getAllBlogsController);

//post || create blog
router.post('/create-blog',createBlogController);

//put || update blog
router.put('/update-blog/:id',updateBlogController);

//get || single blog by id
router.get('/get-blog/:id',getBlogByIdController);

//delete || delete blog
router.delete('/delete-blog/:id',deleteBlogByIdController);

//get || blog by user id
router.get('/user-blog/:id',userBlogController);

module.exports=router;