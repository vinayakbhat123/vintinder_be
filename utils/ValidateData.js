const validator = require("validator");
const ValidateSignUpData = (req) => {
   const {firstName,lastName,emailId,password} = req.body;
    if (!firstName || !lastName ){
       throw new Error("Enter the valid Name.")
    }
    else if(!validator.isEmail(emailId)){
       throw new Error("Please enter the valid emailId.")
    }
    else if(!validator.isStrongPassword(password)){
       throw new Error("Please enter a strong password")
    }
} 

const validateProfileUpdate = (req) => {
 const allowedUpdateField = [
   "firstName",
   "lastName",
   "age",
   "about",
   "photoUrl",
   "gender",
   "skills"]
 const isprofileUpdateValid = Object.keys(req.body).every((key) => allowedUpdateField.includes(key));
 return isprofileUpdateValid;
}
module.exports = {
   ValidateSignUpData,
   validateProfileUpdate  
}