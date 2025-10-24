// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" },
});

let users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendLocation", (data) => {
    users[socket.id] = data;
    io.emit("updateLocations", users); // broadcast to all clients
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("updateLocations", users);
    console.log("User disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Socket.IO server running on port 4000");
});
