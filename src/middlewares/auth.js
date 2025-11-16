const{ User }= require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userAuth = async (req,res,next) => {
  try {
    const cookies = req.cookies;
    const {token} = cookies;
    if(!token) {
       throw new Error("Token Expired Please Login ")
    }
    const decodedData = await jwt.verify(token,process.env.JWT_SECRET_KEY) 
    const {_id} = decodedData
    const user =await User.findById(_id)
    if (!user) {
       throw new Error("User not Found please Login ")
    } 
    req.user = user;
    next()
  } catch (error) {
    res.status(400).send("ERROR:"+error.message) 
  }
  }

module.exports ={ userAuth };