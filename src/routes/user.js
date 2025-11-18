const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const { ConnectionRequestModel } = require("../models/connectionRequest");

userRouter.get("/user/request/received",userAuth, async (req,res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequestModel.find({
        toUserId:loggedInUser._id,
        status:"interested"
      }).populate("fromUserId",["firstName","lastName","photoUrl","gender","age","skills"])
    if(!connectionRequest) {
      return res.json({message:"user request not found"})
    }
    res.json({
      message:"Data Fetched Successfully",
      data:connectionRequest,
    })  
  } catch (error) {
      res.status(400).send("ERROR:" +error.message)
    }
} )

userRouter.get("/user/connections",userAuth, async (req,res) => {
  try {
    const loggedInUser= req.user;
    const connectionRequest = await ConnectionRequestModel.find({
      $or:[
         {fromUserId:loggedInUser._id,status:"accepted"},
         {toUserId:loggedInUser._id,status:"accepted"}
      ],
    }).populate("fromUserId",["firstName","lastName","age","gender","photoUrl","about","skills"])
    if(!connectionRequest) {
       throw new Error("user connection not found")}
    res.json({
      message:"Data Fetched Successfully",
      data:connectionRequest,
    }) 
  } catch (error) {
    res.status(500).send("ERROR:" +error.message)
  }  
})
module.exports = {userRouter}