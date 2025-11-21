const mongoose = require("mongoose");
require("dotenv").config();
const validator= require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
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
    enum:{
      values:["male","female","others"],
      message:`{VALUE}, gender data not valid`
     }
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

userSchema.methods.getJWT = async function() {
   const user = this;
   const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY);
   return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid =await bcrypt.compare(passwordInputByUser,passwordHash)
  return isPasswordValid;
}

const User = mongoose.model("User",userSchema);
module.exports = {User};