// import { Server } from "socket.io";
// import Message from "@/models/Message";
// import Conversation from "@/models/Conversation";
// import { connectDB } from "@/configs/db";

// let io: Server;

// export const initSocketServer = (server: any) => {
//   if (io) return io;
//   io = new Server(server, {
//     cors: { origin: "*", methods: ["GET", "POST"] },
//   });

//   io.on("connection", (socket) => {
//     console.log("✅ New socket connected:", socket.id);

//     socket.on("join", async ({ userId }) => {
//       socket.data.userId = userId;

//       // کاربر در روم های conversation خودش join می‌کند
//       await connectDB();
//       const conversations = await Conversation.find({ members: userId }).lean();
//       conversations.forEach((c) => socket.join(c._id as string));
//       console.log("User joined rooms:", userId, conversations.map((c) => c._id));
//     });

//     socket.on("sendMessage", async (msg) => {
//       try {
//         await connectDB();
//         const newMsg = await Message.create(msg);

//         await Conversation.findOneAndUpdate(
//           { _id: msg.conversationId },
//           { $set: { lastMessageAt: new Date() }, $setOnInsert: { members: [msg.senderId, msg.receiverId] } },
//           { upsert: true, new: true }
//         );

//         // ارسال پیام به همه اعضای conversation
//         io.to(msg.conversationId).emit("receiveMessage", newMsg);
//       } catch (err) {
//         console.error("Error sending message:", err);
//       }
//     });

//     socket.on("typing", ({ conversationId, userId }) => {
//       socket.to(conversationId).emit("typing", { userId, conversationId });
//     });

//     socket.on("stopTyping", ({ conversationId, userId }) => {
//       socket.to(conversationId).emit("stopTyping", { userId, conversationId });
//     });

//     socket.on("disconnect", () => {
//       console.log("Socket disconnected:", socket.id);
//     });
//   });

//   return io;
// };


import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // برای توسعه، بعداً دامنه خودت رو بذار
    methods: ["GET", "POST"],
  },
});

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
server.listen(PORT, () => console.log(`Socket.io server running on port ${PORT}`));
