// import { NextRequest } from "next/server";
// import { Server as SocketIOServer } from "socket.io";
// import io from "@/lib/server";

// const ioHandler = (req: NextRequest) => {
//   // این API فقط برای اینکه Next.js روت داشته باشه ایجاد شده
//   return new Response("Socket endpoint", { status: 200 });
// };

// export const GET = ioHandler;

// // let io: SocketIOServer | null = null;

// declare global {
//   var socketServer: SocketIOServer | null;
// }

// if (!global.socketServer) {
//   const { createServer } = require("http");
//   // const server = createServer();

//   // io = new SocketIOServer(server, {
//   //   cors: {
//   //     origin: "*",
//   //   },
//   // });

//   // ذخیره در global برای Hot Reload
//   global.socketServer = io;

//   io.on("connection", (socket) => {
//     console.log("✅ Client connected:", socket.id);

//     socket.on("join", (userId) => {
//       socket.join(userId);
//       io!.emit("presence", { userId, online: true });
//     });

//     socket.on("sendMessage", (data) => {
//       const { conversationId, message } = data;
//       io!.to(conversationId).emit("receiveMessage", message);
//     });

//     socket.on("typing", (conversationId) => {
//       socket.to(conversationId).emit("typing");
//     });

//     socket.on("seen", ({ conversationId, userId }) => {
//       socket.to(conversationId).emit("seen", { userId });
//     });

//     socket.on("disconnect", () => {
//       console.log("❌ Client disconnected:", socket.id);
//     });
//   });

//   // server.listen(5000, () => {
//   //   console.log("✅ Socket.IO server running on port 5000");
//   // });
//   // if (ioServer) {
//   //   console.log("Socket.IO instance is ready");
//   // }
// } else {
//   io = global.socketServer;
// }

// app/api/socket/route.ts
import { NextRequest } from "next/server";
import { Server as SocketIOServer } from "socket.io";

declare global {
  // برای جلوگیری از چندباره ساختن در هات‌ریلورد
  // eslint-disable-next-line no-var
  var socketServer: SocketIOServer | undefined;
}

function getSocketServer(): SocketIOServer {
  if (!global.socketServer) {
    const io = new SocketIOServer({
      cors: {
        origin: "*", // بعداً دامنه اصلی‌ات رو قرار بده
      },
    });

    io.on("connection", (socket) => {
      console.log("✅ Client connected:", socket.id);

      socket.on("join", (userId) => {
        socket.join(userId);
        io.emit("presence", { userId, online: true });
      });

      socket.on("sendMessage", ({ conversationId, message }) => {
        io.to(conversationId).emit("receiveMessage", message);
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

    global.socketServer = io;
  }
  return global.socketServer;
}

// روت GET فقط برای تست و فعال‌سازی
export async function GET(_req: NextRequest) {
  getSocketServer();
  return new Response("Socket.IO initialized", { status: 200 });
}
