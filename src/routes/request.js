const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const{ User }= require("../models/user");
const { ConnectionRequestModel } = require("../models/connectionRequest");

// POST sendconnectionRequest 
requestRouter.post("/request/send/:status/:toUserId",userAuth, async (req,res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    console.log(typeof(toUserId))
    const status = req.params.status;
    const allowedStatus = ["ignored","interested"]
    if(!allowedStatus.includes(status)){
        return res
          .status(400)
          .json({ message:"Invalid status " + status})
    }
    const IsIdExist = await User.findById(toUserId);

    if(!IsIdExist) {
      return res.status(400).json({message:` User not Found!.`})  }
    const existingConnectionRequest = await ConnectionRequestModel.findOne({
      $or:[
        {fromUserId,toUserId},
        {fromUserId:toUserId,toUserId:fromUserId}
      ]
    })

    if(existingConnectionRequest){
      return res
        .send({message:"Connection Request already exist. "})
    }

    const connectionRequest = new ConnectionRequestModel({
      fromUserId,
      toUserId,
      status,
    });

    const data =  await connectionRequest.save();
    res.json({
      message:"Connection Request Sent Successfully",data
    })
  } catch (error) {
     res.status(400).send("ERROR: "+error.message)
  }

})

module.exports = {
  requestRouter
}