const express = require("express");
const authRouter = express.Router();
const{ User }= require("../models/user");
const {ValidateSignUpData} =require("../../utils/ValidateData")
const bcrypt = require("bcrypt")
// POST /signup API
authRouter.post("/signup",async (req,res) => {
  try {
    //  validation of data
     ValidateSignUpData(req)
     
     const {firstName,lastName,emailId,password,skills} = req.body;

     const IsemailIdExist = await User.findOne({emailId});
     if(IsemailIdExist) return res.status(400).send({message:"Already Exists Please Login"})
    //  console.log(firstName);
    // Encrypting password
    const passwordHash = await bcrypt.hash(password,10);

    // creating a new instance of user model
 
    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
      skills,
    }); 
    const savedUser = await user.save();
    const token = await savedUser.getJWT()
      // Add token to cookie and send response back to user
    res.cookie("token",token,{
      httpOnly:true,
      secure:true,
      sameSite:"none",
      expires: new Date(Date.now() + 8 * 3600000)
    });
    res.json({message:"User data Saved",data:savedUser})
  } catch (error) {
    res.status(400).send("Error: "+ error.message)
  }
})

// POST /login Api
authRouter.post("/login", async (req,res) => {
  try {
    const {emailId,password} = req.body;
     
    const user = await User.findOne({emailId:emailId});

    if(!user){
       throw new Error("Invalid Credentials ");}

    const isPasswordValid = await user.validatePassword(password);
   
    if (isPasswordValid){ 
      // create a JWT token 
      const token = await user.getJWT()
      // Add token to cookie and send response back to user
      res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        expires: new Date(Date.now() + 8 * 3600000)
      });
      res.send(user)}
    else {
      throw new Error("Invalid Credentials")}

  } catch (error) {
     res.status(400).send("Error: "+ error.message)
  }
})
// POST /logout API
authRouter.post("/logout", async (req,res) => {
  try {
    res
     .cookie("token","",{
    expires:new Date(0)
  }) .send("You Logout Successfully")
  } catch (error) {
    
  }

})
module.exports= {
  authRouter
}