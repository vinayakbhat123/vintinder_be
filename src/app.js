const express = require("express");
require("dotenv").config();
const {connectDB }= require("./config/database")
const{ User }= require("./models/user");
const {ValidateSignUpData} =require("../utils/ValidateData")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const {userAuth} = require("./middlewares/auth")
const app = express();

app.use(express.json());
app.use(cookieParser());
// Post SignUp api
app.post("/signup",async (req,res) => {
  try {
    //  validation of data
     ValidateSignUpData(req)
     
     const {firstName,lastName,emailId,password} = req.body;
    // Encrypting password
    const passwordHash = await bcrypt.hash(password,10);

    // creating a new instance of user model
 
    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    }); 
    await user.save();
    res.send("User data Saved")
  } catch (error) {
    res.status(400).send("Error: "+ error.message)
  }
})
// Login Api
app.post("/login", async (req,res) => {
  try {
    const {emailId,password} = req.body;
     
    const user = await User.findOne({emailId:emailId});

    if(!user) throw new Error("Invalid Credentials ");

    const isPasswordValid = bcrypt.compare(password,user.password)
   
    if (isPasswordValid){ 
      // create a JWT token 
      const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY);
      // Add token to cookie and send response back to user
      res.cookie("token",token);
      res.send("Login Successfully ")}
    else {
      throw new Error("Invalid Credentials")}

  } catch (error) {
     res.status(400).send("Error: "+ error.message)
  }
})

//  Get profile of the user
app.get("/profile",userAuth, async (req,res) => {
  try {
    const user = req.user;
    res.send(user)
   }catch (error) {
      res.status(400).send("Invalid Credentials Please Login ")
   }
})
// POST sendconnectionRequest 
app.post("/sendconnectionrequest",userAuth,(req,res) => {
  const user = req.user;
  res.send(user.firstName +"sended connection Request ")
})

connectDB()
  .then(() => {
    console.log("Database Connected");
    app.listen(3000,() => {
        console.log("Server Started Succesfully on port 3000");
   });
  })
  .catch((err) => {
    console.error("Database cannot connected");
  })


 