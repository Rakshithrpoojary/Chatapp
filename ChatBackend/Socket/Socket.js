const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
const socketId = {};
const GetSocketId = (id) => {
  return socketId[id];
};
io.on("connection", (socket) => {
  const userid = socket.handshake.query.id;
  if (userid !== "undefined") {
    socketId[userid] = socket.id;
  }
  io.emit("Onlineuser", Object.keys(socketId));
  socket.on("Typing", (sender, reciver) => {
    const socketid = socketId[reciver];
    io.to(socketid).emit("Typing", sender);
  });
  socket.on("disconnect", () => {
    delete socketId[userid];
    io.emit("Onlineuser", Object.keys(socketId));
  });
});

module.exports = { app, server, io, GetSocketId };
