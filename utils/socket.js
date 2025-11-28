const socket = require("socket.io")
const crypto = require("crypto")

const getSecretId = (userId,toUserId) => {
  return crypto.createHash("sha256").update([userId,toUserId].sort().join("_")).digest("hex");
}

const initialsocket = (server) => { 
const io = socket(server,{
  cors:{
    origin:"http://localhost:5173",
  }
})

io.on("connection",(socket) => {
  // handle events  
  socket.on("joinchat",async ({firstName,userId,toUserId}) => {
    try {
      const roomId = await getSecretId(userId,toUserId);
      console.log(firstName+ "Joining room:"+roomId)
      socket.join(roomId)
    } catch (error) {
      console.log("ERROR:",error)
      
    }
  });
  socket.on("sendchat", async ({firstName,userId,toUserId,text}) => {
    try {
      const roomId = getSecretId(userId,toUserId);
      io.to(roomId).emit("message Received",{firstName,text})
    } catch (error) {
      console.log(error.message)
    }
  });
  socket.on("disconnect",() => {})
})

}

module.exports = initialsocket;