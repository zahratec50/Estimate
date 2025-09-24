import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

const onlineUsers = new Set<string>();

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  // دریافت userId هنگام اتصال
  socket.on("join", (userId: string) => {
    onlineUsers.add(userId);
    io.emit("presenceUpdate", Array.from(onlineUsers));
  });

  socket.on("sendMessage", (msg) => {
    socket.broadcast.emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
    // حذف userId از onlineUsers
    // در صورت نیاز می‌توان userId را نگه داشت و بروزرسانی کرد
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => console.log(`🚀 Socket.IO server running on ${PORT}`));
