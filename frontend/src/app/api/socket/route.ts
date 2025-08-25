import { NextRequest } from "next/server";
import { Server as SocketIOServer } from "socket.io";

const ioHandler = (req: NextRequest) => {
  // این API فقط برای اینکه Next.js روت داشته باشه ایجاد شده
  return new Response("Socket endpoint", { status: 200 });
};

export const GET = ioHandler;

let io: SocketIOServer | null = null;

declare global {
  var socketServer: SocketIOServer | null;
}

if (!global.socketServer) {
  const { createServer } = require("http");
  const server = createServer();

  io = new SocketIOServer(server, {
    cors: {
      origin: "*",
    },
  });

  // ذخیره در global برای Hot Reload
  global.socketServer = io;

  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      io!.emit("presence", { userId, online: true });
    });

    socket.on("sendMessage", (data) => {
      const { conversationId, message } = data;
      io!.to(conversationId).emit("receiveMessage", message);
    });

    socket.on("typing", (conversationId) => {
      socket.to(conversationId).emit("typing");
    });

    socket.on("seen", ({ conversationId, userId }) => {
      socket.to(conversationId).emit("seen", { userId });
    });

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected:", socket.id);
    });
  });

  server.listen(4000, () => {
    console.log("✅ Socket.IO server running on port 4000");
  });
} else {
  io = global.socketServer;
}
