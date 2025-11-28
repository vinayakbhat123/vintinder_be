const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { Chat } = require("../models/chat");
const chatRouter = express.Router();

chatRouter.get("/chat/:toUserId",userAuth,async (req,res) => {
  const userId = req.user._id;
  const{toUserId} = req.params;
  try {
    let chat = await Chat.findOne({
      participants:{ $all:[userId,toUserId]},
    }).populate({
      path:"messages.senderId",
      select:"firstName lastName"
    });
    if (!chat) {
      chat = new Chat({
      participants:[userId,toUserId],
       messages:[],
      });
      await chat.save();
    }
    res.json(chat)

  } catch (error) {
    console.error(error)
  }

})

module.exports = {chatRouter}