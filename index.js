const arr = []
setInterval(()=>{
  arr=[]
},3600000)
const app = require('express')()
const server = require("http").createServer(app);
const io = require("socket.io")(server);
io.sockets.on("connection", (socket) => {
  socket.on('message', (message) => {
    console.log(message);
    arr.push(message);
    socket.emit('message', arr)
    socket.broadcast.emit('message', arr)
  });
  socket.on('update', ()=>{
    socket.emit('message', arr)
  })   
  
  console.log("A client is connected!");
  
});
server.listen(process.env.PORT || 8080);
