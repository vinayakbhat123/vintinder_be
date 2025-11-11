const express = require("express");

const app = express();

app.get("/", (req,res) => {
  res.send("Hello World ")
});

app.post("/user",(req,res) => {
  // saved data in database
  res.send("Data is Added to database")
});

app.get("/user",(req,res) => {
  res.send({firstname:"Vinayak", lastname:"Bhat",age:12})
});

app.delete("/user",(req,res) => {
  res.send("Data is succesfully deleted");
});

app.patch("/user",(req,res) => {
  res.send("Data is replace successfully");
})

// console.log(app);
app.listen(3000,() => {
  console.log("Server Started Succesfully on port 3000");
});
