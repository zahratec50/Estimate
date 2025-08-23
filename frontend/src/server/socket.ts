// import { Server } from "socket.io";
// import Message from "@/models/Message";
// import Conversation from "@/models/Conversation";
// import connectToDB from "@/configs/db";

// let io: Server;

// export const initSocketServer = (server: any) => {
//   if (io) return io; // فقط یکبار init
//   io = new Server(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//     },
//   });

//   const onlineSockets: Record<string, any> = {}; // userId -> socket

//   io.on("connection", (socket) => {
//     console.log("✅ New socket connected:", socket.id);

//     // کاربر وارد شد
//     socket.on("join", ({ userId }) => {
//       onlineSockets[userId] = socket;
//       console.log("User online:", userId);
//     });

//     // دریافت پیام و ذخیره در DB
//     socket.on("sendMessage", async (msg) => {
//       try {
//         await connectToDB();

//         // ایجاد پیام در DB
//         const newMsg = await Message.create(msg);

//         // بروزرسانی conversation
//         await Conversation.findOneAndUpdate(
//           { _id: msg.conversationId },
//           {
//             $set: { lastMessageAt: new Date() },
//             $setOnInsert: { members: [msg.senderId, msg.receiverId] },
//           },
//           { upsert: true, new: true }
//         );

//         // ارسال پیام به گیرنده
//         const receiverSocket = onlineSockets[msg.receiverId];
//         if (receiverSocket) {
//           receiverSocket.emit("receiveMessage", newMsg);
//         }

//         // ارسال پیام برای فرستنده (confirm)
//         socket.emit("receiveMessage", newMsg);
//       } catch (err) {
//         console.error("Error sending message:", err);
//       }
//     });

//     // مدیریت typing
//     socket.on("typing", ({ userId, conversationId }) => {
//       const receiverSocket = onlineSockets[userId];
//       if (receiverSocket) {
//         receiverSocket.emit("typing", { conversationId });
//       }
//     });

//     socket.on("stopTyping", ({ userId, conversationId }) => {
//       const receiverSocket = onlineSockets[userId];
//       if (receiverSocket) {
//         receiverSocket.emit("stopTyping", { conversationId });
//       }
//     });

//     socket.on("disconnect", () => {
//       for (const id in onlineSockets) {
//         if (onlineSockets[id] === socket) delete onlineSockets[id];
//       }
//       console.log("Socket disconnected:", socket.id);
//     });
//   });

//   return io;
// };


import { Server } from "socket.io";
import Message from "@/models/Message";
import Conversation from "@/models/Conversation";
import connectToDB from "@/configs/db";

let io: Server;

export const initSocketServer = (server: any) => {
  if (io) return io;
  io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("✅ New socket connected:", socket.id);

    socket.on("join", async ({ userId }) => {
      socket.data.userId = userId;

      // کاربر در روم های conversation خودش join می‌کند
      await connectToDB();
      const conversations = await Conversation.find({ members: userId }).lean();
      conversations.forEach((c) => socket.join(c._id as string));
      console.log("User joined rooms:", userId, conversations.map((c) => c._id));
    });

    socket.on("sendMessage", async (msg) => {
      try {
        await connectToDB();
        const newMsg = await Message.create(msg);

        await Conversation.findOneAndUpdate(
          { _id: msg.conversationId },
          { $set: { lastMessageAt: new Date() }, $setOnInsert: { members: [msg.senderId, msg.receiverId] } },
          { upsert: true, new: true }
        );

        // ارسال پیام به همه اعضای conversation
        io.to(msg.conversationId).emit("receiveMessage", newMsg);
      } catch (err) {
        console.error("Error sending message:", err);
      }
    });

    socket.on("typing", ({ conversationId, userId }) => {
      socket.to(conversationId).emit("typing", { userId, conversationId });
    });

    socket.on("stopTyping", ({ conversationId, userId }) => {
      socket.to(conversationId).emit("stopTyping", { userId, conversationId });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};
