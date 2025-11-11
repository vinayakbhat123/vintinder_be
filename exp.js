const express = require("express");
const app = express();

app.get("/", (req,res) => {
  res.send("Hello this is home page");
})

app.get("/test", (req,res) => {
  res.send("Hello this is test page");
});

app.get("/hello", (req,res) => {
  res.send("Hello this is hello page");
});

app.listen(3000,() => {
  console.log("Server Started .....")
})