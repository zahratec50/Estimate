// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import clsx from "clsx";
// import { IMessage } from "@/store/adminChatStore";

// interface AdminChatRoomProps {
//   messages: IMessage[];
//   selfId: string;
//   onSendMessage: (content: string) => void;
// }

// export default function AdminChatRoom({
//   messages,
//   selfId,
//   onSendMessage,
// }: AdminChatRoomProps) {
//   const [newMessage, setNewMessage] = useState("");
//   const scrollRef = useRef<HTMLDivElement>(null);

//   const handleSend = () => {
//     if (!newMessage.trim()) return;
//     onSendMessage(newMessage.trim());
//     setNewMessage("");
//   };

//   useEffect(() => {
//     scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex flex-col h-full bg-white dark:bg-secondary-800 rounded-xl shadow">
//       <div
//         ref={scrollRef}
//         className="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-secondary-700"
//       >
//         {messages.length === 0 && (
//           <div className="text-center text-gray-400 mt-10">
//             No messages yet
//           </div>
//         )}
//         {messages.map((msg) => {
//           const mine = msg.senderId === selfId;
//           return (
//             <div
//               key={msg._id}
//               className={clsx("flex w-full", mine ? "justify-end" : "justify-start")}
//             >
//               {!mine && (
//                 <img
//                   src={msg.senderAvatar || "/avatars/default.png"}
//                   alt={msg.senderName || "Unknown"}
//                   className="w-8 h-8 rounded-full object-cover mr-2"
//                 />
//               )}
//               <div
//                 className={clsx(
//                   "max-w-[70%] px-4 py-2 rounded-2xl shadow",
//                   mine ? "bg-primary-500 text-white" : "bg-gray-100 dark:bg-secondary-700"
//                 )}
//               >
//                 {msg.content}
//                 <div className="text-[10px] opacity-70 mt-1 text-right">
//                   {new Date(msg.createdAt).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="flex p-3 border-t border-gray-200 dark:border-secondary-700 gap-2">
//         <input
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           placeholder="Type a message..."
//           className="flex-1 border rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
//         />
//         <button
//           onClick={handleSend}
//           className="px-4 py-2 rounded-2xl bg-primary-500 text-white font-medium hover:bg-primary-600"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { IMessage } from "@/store/adminChatStore";
import { IoMdSend } from "react-icons/io";

interface AdminChatRoomProps {
  messages: IMessage[];
  selfId: string;
  onSendMessage: (content: string) => void;
  loading?: boolean;
}

export default function AdminChatRoom({ messages, selfId, onSendMessage, loading }: AdminChatRoomProps) {
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-secondary-800 rounded-xl shadow">
      <div
        ref={scrollRef}
        className="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-secondary-700"
      >
        {loading ? (
          <div className="text-center text-gray-400 mt-10">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">No messages yet</div>
        ) : (
          messages.map((msg) => {
            const mine = msg.senderId === selfId;
            return (
              <div key={msg._id} className={clsx("flex w-full", mine ? "justify-end" : "justify-start")}>
                {!mine && (
                  <img
                    src={msg.senderAvatar || "/avatars/default.png"}
                    alt={msg.senderName || "Unknown"}
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                )}
                <div
                  className={clsx(
                    "max-w-[70%] px-4 py-2 rounded-2xl shadow",
                    mine ? "bg-primary-500 text-white" : "bg-gray-100 dark:bg-secondary-700"
                  )}
                >
                  {msg.content}
                  <div className="text-[10px] opacity-70 mt-1 text-right">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="min-w-[400px] flex p-2 border border-gray-200 rounded-2xl dark:border-secondary-700 gap-2 focus-within:border-primary-500">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 outline-0"
        />
        <button
          onClick={handleSend}
          aria-label="send message"
          className="rounded-2xl font-medium hover:text-primary-300"
        >
          <IoMdSend className="size-7" />
        </button>
      </div>
    </div>
  );
}
