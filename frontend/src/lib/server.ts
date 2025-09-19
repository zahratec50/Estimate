import { Server } from "socket.io";
import { createServer } from "http";

declare global {
  // جلوگیری از ساخت دوباره
  // eslint-disable-next-line no-var
  var _io: Server | undefined;
}

let io: Server;

if (!global._io) {
  const httpServer = createServer();

  io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("✅ Client connected:", socket.id);
    socket.on("disconnect", () =>
      console.log("❌ Client disconnected:", socket.id)
    );
  });

  httpServer.listen(4000, () => console.log("🚀 Socket.IO on 4000"));
  global._io = io;
} else {
  io = global._io;
}

export default io;
