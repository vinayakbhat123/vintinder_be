const cron = require("node-cron")
const { ConnectionRequestModel } = require("../src/models/connectionRequest")
const {subDays,startOfDay,endOfDay} = require("date-fns")

cron.schedule("0 8 * * * ",() => {
  // console.log("HEllo World" + new Date());
  try {
    const yesterday = subDays(new Date(),1);
    const yesterdaystart = startOfDay(yesterday);
    const yesterdayend = endOfDay(yesterday);
    const pendingrequest = ConnectionRequestModel.find({
      status:"interested",
      createdAt:{
         $gte:yesterdaystart,
         $lt:yesterdayend,
      } 
    }).populate("fromUserId toUserId")
    const listemails = [...new Set(pendingrequest.map((each) => each.toUserId.emailId))]
    
  } catch (error) {
   console.error("ERROR"+error.message) 
  }
})