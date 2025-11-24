const express = require("express");
const {connectDB }= require("./config/database")
require("dotenv").config()
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(cors({
  origin:"",
  credentials:true,
}))
app.use(express.json());
app.use(cookieParser());

const {authRouter} = require("./routes/auth");
const {profileRouter} = require("./routes/profile");
const {requestRouter} = require("./routes/request");
const { userRouter } = require("./routes/user");

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)



const port = process.env.PORT || 3000;
connectDB()
  .then(() => {
    console.log("Database Connected");
    app.listen(port,() => {
        console.log("Server Started Succesfully on port 3000");
   });
  })
  .catch((err) => {
    console.error("Database cannot connected");
  })


 