require("dotenv").config();
const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CLUSTER);
  } catch (error) {
   console.log("Database not connected",error.message)
  }
}

module.exports = {connectDB}
