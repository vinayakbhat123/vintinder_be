const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth")

// POST sendconnectionRequest 
requestRouter.post("/sendconnectionrequest",userAuth,(req,res) => {
  try {
    const user = req.user;
    res.send(user.firstName + "  sended connection Request ")
  } catch (error) {
     res.status(400).send("Invalid Credentials Please Login ")
  }

})

module.exports = {
  requestRouter
}