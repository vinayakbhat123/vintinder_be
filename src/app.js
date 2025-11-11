const express = require("express");
const {adminAuth} = require("./middlewares/auth");
const app = express();

app.use("/admin",adminAuth);
app.get("/admin/getAllData",(req,res) => {
  res.send("All Data Added");
});
app.get("/admin/deleteAllData",(req,res) => {
  res.send("Deleted all the data")
})

app.listen(3000,() => {
  console.log("Server Started Succesfully on port 3000");
});
