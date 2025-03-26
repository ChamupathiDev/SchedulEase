// backend/utils/socket.js
import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Listen for client to join a room using their email
    socket.on("join", (email) => {
      socket.join(email);
      console.log(`Socket ${socket.id} joined room: ${email}`);
    });
  });
};

export { io };
