// "use client";
// import React, { useEffect, useRef } from "react";
// import { useChatStore } from "@/store/chatStore";
// import MessageBubble from "./MessageBubble";

// export default function MessageList() {
//   const { messages, self } = useChatStore();
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     ref.current?.scrollTo({
//       top: ref.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [messages.length]);

//   if (!self) return null;

//   return (
//     <div ref={ref} className="flex-1 overflow-y-auto p-3 space-y-2 bg-white">
//       {messages.map((m) => (
//         <MessageBubble key={m.id} msg={m} selfId={self._id} />
//       ))}
//     </div>
//   );
// }


"use client";

import React, { useRef, useEffect } from "react";
import clsx from "clsx";
import { IMessageDTO } from "@/lib/types";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
  messages: IMessageDTO[];
  selfId: string;
}

export default function MessageList({ messages, selfId }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-1 p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-secondary-700">
      {messages.length === 0 && (
        <div className="text-center text-gray-400 mt-10">No messages yet</div>
      )}
      {messages.map((msg) => {
        const mine = msg.senderId === selfId;
        return (
          <div key={msg.id} className={clsx("flex w-full", mine ? "justify-end" : "justify-start")}>
            {!mine && (
              <img
                src={msg.senderAvatar || "/avatars/default.png"}
                alt={msg.senderName || "Unknown"}
                className="w-8 h-8 rounded-full object-cover mr-2"
              />
            )}
            <MessageBubble msg={msg} selfId={selfId} />
          </div>
        );
      })}
    </div>
  );
}
