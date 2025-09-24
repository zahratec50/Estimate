// server.ts
import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    path: "/api/socket",
    addTrailingSlash: false,
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join", ({ userId }) => {
      socket.join(userId);
      console.log(`User ${userId} joined`);
    });

    socket.on("sendMessage", (msg) => {
      io.to(msg.receiverId).emit("receiveMessage", msg);
    });

    socket.on("typing", ({ conversationId, userId, isTyping }) => {
      socket.to(conversationId).emit("typing", { conversationId, userId, isTyping });
    });

    socket.on("markAsSeen", ({ conversationId, userId }) => {
      socket.to(conversationId).emit("messageSeen", { conversationId, userId });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});