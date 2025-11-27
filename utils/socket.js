const socket = require("socket.io")
const initialsocket = (server) => { 
const io = socket(server,{
  cors:{
    origin:"http://localhost:5173",
  }
})

io.on("connection",(socket) => {
  // handle events
})

}

module.exports = initialsocket;