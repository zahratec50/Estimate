import express from "express";
// import http from "http";
// import { Server } from "socket.io";
import dotenv from "dotenv";
import io from "@/lib/server";

dotenv.config();

const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*", // برای توسعه، بعداً دامنه خودت رو بذار
//     methods: ["GET", "POST"],
//   },
// });

interface IMessageDTO {
  _id: string;
  conversationId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

// Online users tracking
const onlineUsers = new Map<string, string>(); // userId -> socketId

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // Join user
  socket.on("join", (userId: string) => {
    onlineUsers.set(userId, socket.id);
    io.emit("presenceUpdate", Array.from(onlineUsers.keys()));
  });

  // Send message
  socket.on("sendMessage", (data: IMessageDTO) => {
    const receiverSocket = onlineUsers.get(data.senderId); // ساده سازی
    io.emit("receiveMessage", data); // Broadcast به همه یا میتونی فقط به گیرنده
  });

  // Typing
  socket.on("typing", ({ conversationId, userId }) => {
    socket.broadcast.emit("typing", { conversationId, userId });
  });

  socket.on("stopTyping", ({ conversationId, userId }) => {
    socket.broadcast.emit("stopTyping", { conversationId, userId });
  });

  // Seen
  socket.on("seen", ({ conversationId, userId }) => {
    socket.broadcast.emit("seen", { conversationId, userId });
  });

  // Disconnect
  socket.on("disconnect", () => {
    for (const [userId, sId] of onlineUsers.entries()) {
      if (sId === socket.id) onlineUsers.delete(userId);
    }
    io.emit("presenceUpdate", Array.from(onlineUsers.keys()));
  });
});

const PORT = process.env.SOCKET_PORT || 4000;
// server.listen(PORT, () => console.log(`Socket.io server running on port ${PORT}`));
