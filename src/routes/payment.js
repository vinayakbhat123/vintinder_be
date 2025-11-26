const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router()
const instance = require("../../utils/razorpay");
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

module.exports = {paymentRouter};