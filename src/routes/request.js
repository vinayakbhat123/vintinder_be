const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth")

// POST sendconnectionRequest 
requestRouter.post("/sendconnectionrequest",userAuth,(req,res) => {
  const user = req.user;
  res.send(user.firstName + "  sended connection Request ")
})

module.exports = {
  requestRouter
}