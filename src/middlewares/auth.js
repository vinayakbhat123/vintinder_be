const adminAuth = (req,res,next) => {
  console.log("Admin Auth getting checked")
   const token = "xyz";
   const isAdminAuth = token === "xyz";
   if (!isAdminAuth) {
    res.status(401).send("UnAuthrised");
   }
   else{
    next();
   }
}
console.log(adminAuth)
module.exports ={ adminAuth };