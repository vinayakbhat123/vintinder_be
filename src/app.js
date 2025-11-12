const express = require("express");
const {connectDB }= require("./config/database")
const app = express();

connectDB()
  .then(() => {
    console.log("Database Connected");
    app.listen(3000,() => {
        console.log("Server Started Succesfully on port 3000");
   });
  })
  .catch((err) => {
    console.error("Database cannot connected");
  })


