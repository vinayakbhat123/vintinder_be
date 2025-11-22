const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const { ConnectionRequestModel } = require("../models/connectionRequest");
const { User } = require("../models/user");
const USER_SAFE_DATA = ["firstName","lastName","age","gender","photoUrl","about","skills"]

userRouter.get("/user/request/received",userAuth, async (req,res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequestModel.find({
        toUserId:loggedInUser._id,
        status:"interested"
      }).populate("fromUserId",["firstName","lastName","photoUrl","gender","age","skills","about"])
    if(!connectionRequest || connectionRequest.length === 0 ) {
      throw new Error("User Data Not Found")
      // return res.jso({message:"user request not found"})
    }
    res.send(connectionRequest)  
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
    }).populate("fromUserId",USER_SAFE_DATA)
      .populate("toUserId",USER_SAFE_DATA)
    if(!connectionRequest) {
       throw new Error("user connection not found")}
    const data = connectionRequest.map((key) => {
      if (key.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return key.toUserId
      }
      return key.fromUserId})
    res.json({data}) 
  } catch (error) {
    res.status(500).send("ERROR:" + error.message)
  }  
})

userRouter.get("/feed",userAuth, async (req,res) => {
  try {
    const loggedInUser = req.user;
    let limit = req.query.limit || 10;
    limit = limit > 50 ? 50 : limit;
    const page = req.query.page || 1;
    const skip = (page-1)*limit;
    const connectionRequest = await ConnectionRequestModel.find({
      $or:[
        {fromUserId:loggedInUser._id},
        {toUserId:loggedInUser._id}
      ]
    }).select("fromUserId toUserId")
    const hideConnectionUsers = new Set()
    connectionRequest.forEach((req) => {   
      $or:[
        hideConnectionUsers.add(req.fromUserId.toString()),
        hideConnectionUsers.add(req.toUserId.toString())
      ]  
    });

    const uniqueUsers = await User.find({
      $and:[
        {_id: {$nin: Array.from(hideConnectionUsers)}},
        {_id: {$ne: loggedInUser._id}}
      ]
    }).select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit)
    res.send(uniqueUsers)
  } catch (error) {
    res.status(400).send("ERROR:"+error.message)
  }
})
module.exports = {userRouter}