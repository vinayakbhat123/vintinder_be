const express = require("express");
const {connectDB }= require("./config/database")
const{ User }= require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup",async (req,res) => {
  // creating a new instance of user model
  const user = new User(req.body);
  
 try { 
   await user.save();
   res.send("User added Successfully")
 } catch (error) {
   res.status(400).send("Error saving the user:",err.message);
 }
})

// UserOne api :- To get one user from User Model
app.get("/userone", async (req,res) => {
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

app.delete("/user", async (req,res) =>{
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User Deleted succesfully..");
  } catch (error) {
    res.status(400).send("Somthing went wrong...");
  } 
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


