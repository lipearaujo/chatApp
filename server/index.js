const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

// instanciate the server
// the first argument of this function is the server we created which is the variable server
// the second argument is an object it will take care of the cors
const io = new Server(server, {
  //with the cors we can specify some of the credentials and some of the settings we want to related to cors in our socket.io server
  cors: {
    origin: process.env.REACT_APP_FRONTEND_URL, // tells where the request is originated and it's ok to accept socket communication with this specific URL
    methods: ["GET", "POST"], // specify which methods can be accepted
  },
});

//listening for events
io.on("connection", (socket) => {
  console.log(`a user of id ${socket.id} is connected`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with id ${socket.id} connected to the room ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data); // sends messages to all users who are connected to a specific room
    //socket.broadcast.emit("receive_message", data); // sends messages to all users connected in the server
  });

  socket.on("disconnect", () => {
    console.log("User disconnect", socket.id);
  });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
