import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer();
const io = new Server(server, { cors: { origin: "*" } });

const onlineUsers = new Map<string, string>();

io.on("connection", (socket) => {
  socket.on("join", (payload) => {
    const userId = payload && payload.userId;
    if (!userId) return;
    onlineUsers.set(userId, socket.id);
    socket.data.userId = userId;
    io.emit("presenceUpdate", Array.from(onlineUsers.keys()));
  });

  socket.on("typing", (payload) => {
    const { userId, receiverId, conversationId } = payload || {};
    if (!receiverId) return;
    const target = onlineUsers.get(receiverId);
    if (target) io.to(target).emit("typing", { userId, conversationId });
  });

  socket.on("stopTyping", (payload) => {
    const { userId, receiverId, conversationId } = payload || {};
    if (!receiverId) return;
    const target = onlineUsers.get(receiverId);
    if (target) io.to(target).emit("stopTyping", { userId, conversationId });
  });

  socket.on("sendMessage", (payload) => {
    if (!payload) return;
    const target = onlineUsers.get(payload.receiverId);
    if (target) io.to(target).emit("receiveMessage", payload);
    socket.emit("receiveMessage", payload);
  });

  socket.on("disconnect", () => {
    const uid = socket.data.userId as string | undefined;
    if (uid && onlineUsers.get(uid) === socket.id) onlineUsers.delete(uid);
    io.emit("presenceUpdate", Array.from(onlineUsers.keys()));
  });
});

server.listen(3001, () => console.log("Socket.IO realtime server on :3001"));
