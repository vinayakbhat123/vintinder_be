const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth")
const {validateProfileUpdate} = require("../../utils/ValidateData")

//  Get profile of the user
profileRouter.get("/profile/view",userAuth, async (req,res) => {
  try {
    const user = req.user;
    res.send(user)
   }catch (error) {
      res.status(400).send("Invalid Credentials Please Login ")
   }
})

profileRouter.patch("/profile/update",userAuth, async (req,res) => {
  try {
    // validate the data
    if(!validateProfileUpdate(req)){
      throw new Error("Profile Updation Failed")
    }
    const loggedInUser = req.user
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))
    loggedInUser.save();
    res.json({message: `${loggedInUser.firstName}, Your Profile Data Updated Succesfully`,data:loggedInUser})
  } catch (error) {  
    res.status(400).send("ERROR:"+ error.message)
  }

})

module.exports = {
  profileRouter
}