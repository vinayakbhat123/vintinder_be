const mongoose = require("mongoose");
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
  },
  password:{
    type:Number,
    required:true,
    min:6,
    max:12,
  },
  age:{
    type:String,
    min:18,
  },
  gender:{
    type:String,
    validate(value) {
        if (!["male,female,others"].includes(value)){
            throw new console.error("Gender data not valid");
        }
    }
  },
  photoUrl:{
    type:String,
    default:"",
  },
  about:{
    type:String,
    default:"This is default about field for user",
    minlength:5,
    maxlength:100,
  },
  skills:{
    type:[String],
  }
},{
  timestamps:true,
});

const User = mongoose.model("User",userSchema);
module.exports = {User};