const mongoose = require("mongoose");
const validator= require("validator");
const {Schema} = mongoose

const userSchema = new Schema({
  firstName: {
    type:String,
    required:true,
    minlength:4,
    maxlength:20,
  },
  lastName:{
    type:String,
    minlength:4,
    maxlength:10,
  },
  emailId:{
    type:String,
    lowercase:true,
    trim:true,
    required:true,
    unique:true,
    minlength:8,
    maxlength:25,
    validate(value){
       if (!validator.isEmail(value)){
          throw new Error("Enter a valid EmailId.")
       }
    },
  },
  password:{
    type:String,
    required:true,
     validate(value){
       if (!validator.isStrongPassword(value)){
          throw new Error("Enter a Strong password ")
       }
    },
  },
  age:{
    type:String,
    min:18,
  },
  gender:{
    type:String,
    validate(value) {
        if(!["male","female,others"].includes(value)) {
          throw new Error("Gender data not valid")
        }
    },
  },
  photoUrl:{
    type:String,
    default:"https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg",
     validate(value){
       if (!validator.isURL(value)){
          throw new Error("Enter a valid Photo URL.")
       }
    }
  },
  about:{
    type:String,
    default:"This is default about field for user",
    minlength:5,
    maxlength:100,
  },
  skills:{
    type:[String],
    maxlength:10,
  }
},{
  timestamps:true,
});

const User = mongoose.model("User",userSchema);
module.exports = {User};