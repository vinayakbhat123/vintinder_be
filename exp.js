const express = require("express");
const app = express();



app.use("/test", (req,res) => {
  res.send("Hello this is test page");
});

app.use("/hello/2", (req,res) => {
  res.send(" this is hello page");
});
app.use("/hello", (req,res) => {
  res.send("Hello hello hello");
});

app.use("/", (req,res) => {
  res.send("this is home page");
});

app.listen(3000,() => {
  console.log("Server Started .....")
})