const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
   fromUserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
   toUserId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   },
   status:{
    type:String,
    required:true,
    enum:{
      values:["ignored","interested","accepted","rejected"],
      message:`{VALUE}, is incorrect  status ..`
    }
   }
},{  timestamps:true })

connectionRequestSchema.pre("save",function(next) {
const connectionRequest = this;
if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
  throw new Error("Cannot send connection Request to Yourself")
}
next()
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel ",connectionRequestSchema)
module.exports = {ConnectionRequestModel}