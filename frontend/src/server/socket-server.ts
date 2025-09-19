// // server/socket-server.ts
// import http from "http";
// import { Server, Socket } from "socket.io";
// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
// import { createClient } from "redis";
// import { createAdapter } from "@socket.io/redis-adapter";

// dotenv.config();

// const PORT = Number(process.env.SOCKET_PORT || 4000);
// const ORIGIN = process.env.NEXT_PUBLIC_APP_ORIGIN || "http://localhost:3000";
// const JWT_SECRET = process.env.JWT_SECRET || "please_change_me";
// const REDIS_URL = process.env.REDIS_URL || "";

// type UserId = string;

// // runtime structures
// const online = new Set<UserId>();
// const socketsByUser = new Map<UserId, Set<string>>(); // userId -> set(socket.id)

// async function makeRedisAdapter(io: Server) {
//   if (!REDIS_URL) {
//     console.log("⚠️ REDIS_URL not provided — running without Redis adapter (single instance).");
//     return;
//   }

//   try {
//     const pubClient = createClient({ url: REDIS_URL });
//     const subClient = pubClient.duplicate();

//     await pubClient.connect();
//     await subClient.connect();

//     io.adapter(createAdapter(pubClient, subClient));
//     console.log("✅ Redis adapter connected for Socket.IO");
//   } catch (err) {
//     console.error("❌ Failed to connect Redis adapter:", err);
//   }
// }

// function verifyToken(token?: string): { userId: string } | null {
//   if (!token) return null;
//   try {
//     // Expect JWT payload to include `sub` or `userId`
//     const payload = jwt.verify(token, JWT_SECRET) as any;
//     const userId = payload?.sub || payload?.userId;
//     if (!userId) return null;
//     return { userId };
//   } catch (e) {
//     return null;
//   }
// }

// async function start() {
//   const server = http.createServer();
//   const io = new Server(server, {
//     cors: {
//       origin: ORIGIN,
//       credentials: true,
//     },
//     // pingTimeout / pingInterval tuning possible here
//   });

//   // Optionally enable Redis adapter if REDIS_URL provided
//   await makeRedisAdapter(io);

//   // Middleware: handshake auth via token
//   io.use((socket, next) => {
//     try {
//       const token = socket.handshake.auth?.token as string | undefined;
//       const res = verifyToken(token);
//       if (!res) return next(new Error("unauthorized"));
//       // save userId on socket.data for later use
//       socket.data.userId = res.userId;
//       return next();
//     } catch (err) {
//       return next(new Error("unauthorized"));
//     }
//   });

//   io.on("connection", (socket: Socket) => {
//     const uid: UserId | undefined = socket.data.userId;
//     if (!uid) {
//       // Shouldn't happen due to middleware, but safe-guard
//       socket.disconnect();
//       return;
//     }

//     // Register socket under user
//     if (!socketsByUser.has(uid)) socketsByUser.set(uid, new Set());
//     socketsByUser.get(uid)!.add(socket.id);
//     online.add(uid);

//     // Join personal room
//     socket.join(uid);

//     // If client provided conversation rooms to join at connect:
//     const rooms: string[] | undefined = socket.handshake.auth?.rooms;
//     if (Array.isArray(rooms)) {
//       rooms.forEach((r) => socket.join(r));
//     }

//     // Broadcast presence to others (you can optimize to emit only to friends)
//     io.emit("presenceUpdate", Array.from(online));

//     // Helper: safe emit to user or conversation
//     const emitToUser = (userId: string, ev: string, payload: any) => {
//       io.to(userId).emit(ev, payload);
//     };
//     const emitToConversation = (conversationId: string, ev: string, payload: any) => {
//       io.to(conversationId).emit(ev, payload);
//     };

//     // ===== event handlers =====
//     socket.on("sendMessage", (msg) => {
//       // msg should be the saved DB message (with _id, conversationId, senderId, receiverId, createdAt, etc.)
//       try {
//         if (msg?.receiverId) emitToUser(msg.receiverId, "receiveMessage", msg);
//         if (msg?.conversationId) emitToConversation(msg.conversationId, "receiveMessage", msg);
//       } catch (err) {
//         console.error("sendMessage emit error:", err);
//       }
//     });

//     socket.on("typing", ({ userId, conversationId }: { userId: string; conversationId: string }) => {
//       if (!conversationId) return;
//       socket.to(conversationId).emit("typing", { userId, conversationId });
//     });

//     socket.on("stopTyping", ({ userId, conversationId }: { userId: string; conversationId: string }) => {
//       if (!conversationId) return;
//       socket.to(conversationId).emit("stopTyping", { userId, conversationId });
//     });

//     socket.on("delivered", ({ messageId, conversationId, byUserId, toUserId }: any) => {
//       // notify the original sender (or conversation)
//       if (toUserId) emitToUser(toUserId, "delivered", { messageId, conversationId, byUserId });
//       if (conversationId) emitToConversation(conversationId, "delivered", { messageId, conversationId, byUserId });
//     });

//     socket.on("seen", ({ conversationId, byUserId }: { conversationId: string; byUserId: string }) => {
//       if (!conversationId) return;
//       emitToConversation(conversationId, "seen", { conversationId, byUserId });
//     });

//     // Clean up on disconnect
//     socket.on("disconnect", () => {
//       const set = socketsByUser.get(uid);
//       if (set) {
//         set.delete(socket.id);
//         if (set.size === 0) {
//           socketsByUser.delete(uid);
//           online.delete(uid);
//           io.emit("presenceUpdate", Array.from(online));
//         } else {
//           socketsByUser.set(uid, set);
//         }
//       }
//     });
//     // ==========================
//   });

//   server.listen(PORT, () => {
//     console.log(`🔌 Socket server running on :${PORT} (CORS origin: ${ORIGIN})`);
//   });
// }

// start().catch((err) => {
//   console.error("Socket server failed to start:", err);
//   process.exit(1);
// });
