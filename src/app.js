const express = require("express");
const {connectDB }= require("./config/database")
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config()
require(".././utils/cronjob")
const app = express();
const http = require("http")
const initialsocket = require("../utils/socket")

app.use(
  cors({
  origin:"http://localhost:5173",
  credentials:true,
}))
app.use(express.json());
app.use(cookieParser());  

const {authRouter} = require("./routes/auth");
const {profileRouter} = require("./routes/profile");
const {requestRouter} = require("./routes/request");
const { userRouter } = require("./routes/user");
const {paymentRouter} = require("./routes/payment")

app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)
app.use("/",paymentRouter)

const server = http.createServer(app);
initialsocket(server)


// const port = process.env.PORT || 3000;
connectDB()
  .then(() => {
    console.log("Database Connected");
    server.listen(3000,() => {
        console.log("Server Started Succesfully on port 3000");
   });
  })
  .catch((err) => {
    console.error("Database cannot connected");
  })


 