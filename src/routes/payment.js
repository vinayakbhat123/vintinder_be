const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router()
const instance = require("../../utils/razorpay");
const Payment = require("../models/payment");
const { membershipsAmount } = require("../../utils/constants");
const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils");
const { User } = require("../models/user");
paymentRouter.post("/payment/create", userAuth, async (req,res) => {
  // payment code 
  try {
     const {firstName,lastName,emailId} = req.user
     const {membershipType} = req.body;
     const order = await instance.orders.create({
     amount:membershipsAmount[membershipType]*100,
     currency:"INR",
     receipt:"receipt#1",
     notes:{
       firstName,
       lastName,
       emailId,
       membershipType:membershipType,
    },
  });
  // save order in database
  const payment = new Payment({
    userId:req.user._id,
    orderId : order.id,
    status:order.status,
    amount:order.amount,
    currency:order.currency,
    receipt:order.receipt,
    notes:order.notes,
  });
  const savedPayment = await payment.save()
  // Return back my order details to frontend
  res.json({...savedPayment.toJSON(),key_id:process.env.RAZORPAY_KEY })
  } catch (error) {
    if(error.status === 500){
      console.error("ERROR:"+ error.message)
    }
    return res.status(400).json({msg:error.message})
    
  }

});

paymentRouter.post("/payment/webhook",async (req,res) => {
 try {
  const webhookSignature = req.get("X-Razorpay-Signature");
  const isWebhookValid = await validateWebhookSignature(JSON.stringify(req.body),
  webhookSignature,
  "Webshook Secret key");

  if (!isWebhookValid){
    return res.status(400).json({msg:"Webhook is Invalid"});
  }
  // Update the payment status
  const paymentDetails =req.body.payload.entity;

  const payment = Payment.findOne({orderId:paymentDetails.order_id})
  payment.status = paymentDetails.status;
  await payment.save();

  // Find the userId and update the premium
  const user = User.findOne({_id:payment.userId });
  user.isPremium = true;
  user.membershipType = payment.notes.membershipType;

  return res.status(200).json({msg:"Webhook received succesfully"})
  await payment.save()
 } catch (error) {
  console.error("ERROR:"+error.message)
 }

});

paymentRouter.get("/payment/verify",userAuth, async (req,res) =>{
  const user = req.user.toJSON();
  if (user.isPremium) {
    return res.json({...user}) 
  }else{
    return res.json({...user})
  }
})
module.exports = {paymentRouter};