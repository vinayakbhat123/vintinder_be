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

module.exports = {ValidateSignUpData}