const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth")

//  Get profile of the user
profileRouter.get("/profile",userAuth, async (req,res) => {
  try {
    const user = req.user;
    res.send(user)
   }catch (error) {
      res.status(400).send("Invalid Credentials Please Login ")
   }
})


module.exports = {
  profileRouter
}