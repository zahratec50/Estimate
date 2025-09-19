import { Server } from "socket.io";
import Message from "@/models/Message";
import {connectDB} from "@/configs/db";

const socketHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("✅ Socket connected:", socket.id);

      socket.on("join", ({ userId }) => {
        socket.join(userId);
      });

      socket.on("sendMessage", async (msg) => {
        await connectDB();
        const newMsg = await Message.create(msg);
        io.to(msg.receiverId).emit("receiveMessage", newMsg);
        io.to(msg.senderId).emit("receiveMessage", newMsg);
      });

      socket.on("typing", ({ conversationId, userId, receiverId }) => {
        io.to(receiverId).emit("typing", { userId });
      });

      socket.on("stopTyping", ({ conversationId, userId, receiverId }) => {
        io.to(receiverId).emit("stopTyping", { userId });
      });
    });
  }
  res.end();
};

export default socketHandler;
