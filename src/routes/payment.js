const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router()
const instance = require("../utils/razorpay")
const Payment = require("../models/payment");
const { membershipsAmount } = require("../../utils/constants");
paymentRouter.post("/payment/create", userAuth, async (req,res) => {
  // payment code 
  try {
     const {firstName,lastName,emailId} = req.user
     const {membershipType} = req.body;
     const order = await instance.orders.create({
     amount:membershipsAmount[membershipType]*100,
     currency:"INR",
     recipt:"recipt#1",
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
    orderId : order._id,
    status:order.status,
    amount:order.amount,
    currency:order.currency,
    receipt:order.receipt,
    notes:order.notes,
  });
  const savedPayment = await payment.save()
  // Return back my order details to frontend
  res.json({...savedPayment.toJSON(),key_id:"YOUR_KEY_ID"})
  } catch (error) {
    return resizeBy.status(500).json({msg:error.message})
    
  }

});

module.exports = paymentRouter;