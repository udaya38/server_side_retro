const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const path=require('path');
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
app.use(cors());
app.use(express.static(path.join(__dirname+'/build')));
const io = socketio(server);
// app.get("/", (req, res) => {
//   res.send("Server is up and running");
// });
app.get('/board',(req,res)=>{
  res.send({ description: "Its working!!"})
})

io.on("connection", (socket) => {
  console.log("joined",socket.id)
  socket.on("join-room", (room) => {
    socket.join(room);
  });
  socket.on("make-button-enabled", (value, room) => {
    io.to(room).emit("receive-make-button-enabled", value);
  });
  socket.on("make-blur", (value, room) => {
    io.to(room).emit("receive-make-blur", value);
  });
  socket.on("went-well", (value, room) => {
    io.to(room).emit("receive-went-well", value);
  });
  socket.on("to-improve", (value, room) => {
    io.to(room).emit("receive-to-improve", value);
    //socket.broadcast.emit('receive-to-improve',value)
  });
  socket.on("action-items", (value, room) => {
    // persistdata.data3=value;
    io.to(room).emit("receive-action-items", value);
  });
  socket.on("went-well-comment", (value, room) => {
    io.to(room).emit("receive-went-well-comment", value);
  });
  socket.on("to-improve-comment", (value, room) => {
    io.to(room).emit("receive-to-improve-comment", value);
  });
  socket.on("action-item-comment", (value, room) => {
    io.to(room).emit("receive-action-item-comment", value);
  });
});

server.listen(process.env.PORT || 3000,()=>{
  console.log("port is listening to 3000")
});

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname+'/build/index.html'));
})
//module.exports.handler = serverless(app);
