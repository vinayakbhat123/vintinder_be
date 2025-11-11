const express = require("express");

const app = express();

app.get("/", (req,res) => {
  res.send("Hello World ")
});

app.get("/test",(req,res) => {
  res.send("Hello World this is test page ")
});


app.get("/hello",(req,res) => {
  res.send("Hello World this is hello page")
});

// console.log(app);
app.listen(3000,() => {
  console.log("Server Started Succesfully on port 3000");
});
