"use client";

import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import AdminChatRoom from "./AdminChatRoom";
import UserDetailPanel from "./UserDetailPanel";
import type { IUser, IMessage } from "@/store/adminChatStore";

export default function AdminChats() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Fetch users
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoadingUsers(true);
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        setUsers(data);
        if (data.length) setSelectedUser(data[0]);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoadingUsers(false);
      }
    }
    fetchUsers();
  }, []);

  // Fetch messages برای selected user
  useEffect(() => {
    if (!selectedUser) {
      setMessages([]);
      return;
    }

    async function fetchMessages() {
      try {
        setLoadingMessages(true);
        const res = await fetch(`/api/chat/messages/${selectedUser!._id}`);
        if (!res.ok) throw new Error("Failed to fetch messages");
        const msgs = await res.json();
        setMessages(msgs);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    }

    fetchMessages();
  }, [selectedUser]);

  // ارسال پیام توسط ادمین
  const handleSendMessage = async (content: string) => {
    if (!selectedUser || !content.trim()) return;

    try {
      const res = await fetch(`/api/chat/messages/${selectedUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim() }),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const msg = await res.json();
      setMessages((prev) => [...prev, msg]);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_320px] gap-4 h-[calc(100vh-80px)] p-2">
      <UserList
        users={users}
        messages={messages}
        selectedUserId={selectedUser?._id || null}
        onSelectUser={(id) =>
          setSelectedUser(users.find((u) => u._id === id) || null)
        }
      />
      <AdminChatRoom
        messages={messages}
        selfId="admin"
        onSendMessage={handleSendMessage}
        loading={loadingMessages}
      />
      {selectedUser ? (
        <UserDetailPanel user={selectedUser} />
      ) : (
        <div className="bg-white dark:bg-secondary-800 rounded-xl shadow flex items-center justify-center text-gray-500">
          No user selected
        </div>
      )}
    </div>
  );
}

// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import UserList from "./UserList";
// import AdminChatRoom from "./AdminChatRoom";
// import UserDetailPanel from "./UserDetailPanel";
// import type { IUser, IMessage } from "@/store/adminChatStore"; // فرض کنیم IUser حالا lastMessage داره

// export default function AdminChats() {
//   const [users, setUsers] = useState<IUser[]>([]);
//   const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const [loadingUsers, setLoadingUsers] = useState(true);
//   const [loadingMessages, setLoadingMessages] = useState(false);

//   // Fetch users with lastMessage and unreadCount from API
//   useEffect(() => {
//     async function fetchUsers() {
//       try {
//         setLoadingUsers(true);
//         const res = await fetch("/api/admin/users");
//         if (!res.ok) throw new Error("Failed to fetch users");
//         const data = await res.json();
//         setUsers(data);
//         if (data.length) setSelectedUser(data[0]);
//       } catch (err) {
//         console.error("Failed to fetch users:", err);
//         // TODO: Add toast error
//       } finally {
//         setLoadingUsers(false);
//       }
//     }
//     fetchUsers();
//   }, []);

//   // Fetch messages for selected user
//   useEffect(() => {
//     if (!selectedUser) {
//       setMessages([]);
//       return;
//     }

//     async function fetchMessages() {
//       try {
//         setLoadingMessages(true);
//         const res = await fetch(`/api/chat/messages/${selectedUser!._id}`);
//         if (!res.ok) throw new Error("Failed to fetch messages");
//         const msgs = await res.json();
//         setMessages(msgs);
//         // TODO: Reset unreadCount for this user on server
//       } catch (err) {
//         console.error("Failed to fetch messages:", err);
//         setMessages([]);
//       } finally {
//         setLoadingMessages(false);
//       }
//     }

//     fetchMessages();
//     // TODO: Setup Socket.io listener for new messages
//     // socket.on('newMessage', (msg) => if (msg.receiverId === 'admin') setMessages(prev => [...prev, msg]));
//   }, [selectedUser]);

//   // Send message with optimistic update
//   const handleSendMessage = useCallback(async (content: string) => {
//     if (!selectedUser || !content.trim()) return;

//     const optimisticMsg = {
//       _id: Date.now().toString(), // Temp ID
//       content: content.trim(),
//       senderId: "admin",
//       receiverId: selectedUser._id,
//       createdAt: new Date().toISOString(),
//     };
//     setMessages((prev) => [...prev, optimisticMsg]); // Optimistic UI

//     try {
//       const res = await fetch(`/api/chat/messages/${selectedUser._id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ content: content.trim() }),
//       });

//       if (!res.ok) throw new Error("Failed to send message");
//       const msg = await res.json();
//       // Replace optimistic msg with real one
//       setMessages((prev) => prev.map((m) => (m._id === optimisticMsg._id ? msg : m)));
//     } catch (err) {
//       console.error("Failed to send message:", err);
//       // Remove optimistic msg on error
//       setMessages((prev) => prev.filter((m) => m._id !== optimisticMsg._id));
//       // TODO: Toast error
//     }
//   }, [selectedUser]);

//   const handleSelectUser = useCallback((id: string) => {
//     setSelectedUser(users.find((u) => u._id === id) || null);
//   }, [users]);

//   if (loadingUsers) {
//     return <div className="text-center p-4">Loading users...</div>;
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_320px] gap-4 h-[calc(100vh-80px)] p-2">
//       <UserList
//         users={users}
//         selectedUserId={selectedUser?._id || null}
//         onSelectUser={handleSelectUser}
//       />
//       <AdminChatRoom
//         messages={messages}
//         selfId="admin"
//         onSendMessage={handleSendMessage}
//         loading={loadingMessages}
//       />
//       {selectedUser ? (
//         <UserDetailPanel user={selectedUser} />
//       ) : (
//         <div className="bg-white dark:bg-secondary-800 rounded-xl shadow flex items-center justify-center text-gray-500">
//           No user selected
//         </div>
//       )}
//     </div>
//   );
// }
