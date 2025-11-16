const express = require("express");
const {connectDB }= require("./config/database")
const{ User }= require("./models/user");
const {ValidateSignUpData} =require("../utils/ValidateData")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
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
      const token = await jwt.sign({_id:user._id},"Vin@Tinder246");
      console.log(token);
      // Add token to cookie and send response back to user
      res.cookie("token",token);
      res.send("Login Successfully ")}
    else {
      throw new Error("Invalid Credentials")}

  } catch (error) {
     res.status(400).send("Error: "+ error.message)
  }
})
// Get User by email
app.get("/user", async (req,res) => {
   const emailId = req.body.emailId;
   try {
     const UserData = await User.findOne({emailId : emailId});
     res.send(UserData)
  } catch (error) {
     res.status(404).send("User not found")
  }
})
// feed api to get all the user data
app.get("/feed", async (req,res) => {
  try {
    const UserData = await User.find({});
    res.send(UserData)
  } catch (error) {
    res.status(404).send("Somthing went wrong..fe")
  }
})

// Delete a user from database
app.delete("/user", async (req,res) =>{
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted succesfully..");
  } catch (error) {
    res.status(400).send("Somthing went wrong...");
  } 
})

// Update a data  of the user
app.patch("/user/:userId", async (req,res) => {
   const userId = req.params?.userId;
   const data = req.body;
   try {
      const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"]
      const isAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
      if (!isAllowed) throw new Error("Update not allowed.")
        if (data?.skills.length > 10) {
            throw new Error("Skills canot be more then 10")
        }
      const user = await User.findByIdAndUpdate(userId,data,{returnDocument: "after",runValidators:true})
      //  console.log(user)
      res.send("User Updated successfully")
   }  catch (error) {
      res.status(400).send("Somthing went wrong..." + error.message);
   }
})
//  Get profile of the user
app.get("/profile", async (req,res) => {
  try {
    const cookies = req.cookies;
    const {token} = cookies;
    if(!token){
       throw new Error("Invalid Token")}
    const decodedMessage = await jwt.verify(token,"Vin@Tinder246")
    const {_id} = decodedMessage
    const user = await User.findById(_id);
    if(!user) {
        throw new Error("User Not Found Please Login ...")
    }
    res.send(user)
   }catch (error) {
      res.status(400).send("Invalid Credentials Please Login ")
   }
})
// app.patch("/user",async (req,res) => {
//   const emailId = req.params.emailId;
//   const data = req.body;
//   try {
//     await User.findOneAndUpdate(emailId,data);
//     res.send("Data updated ")
//   } catch (error) {
//     res.status(400).send("Somthing went wrong...");
//   }
// })
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


 