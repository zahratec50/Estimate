// import type { IUser, IMessage } from "@/store/adminChatStore";

// export async function getUsers(): Promise<IUser[]> {
//   const res = await fetch("/api/admin/users");
//   if (!res.ok) throw new Error("Failed to fetch users");
//   return res.json();
// }

// export async function getMessages(userId: string): Promise<IMessage[]> {
//   const res = await fetch(`/api/admin/messages?userId=${userId}`);
//   if (!res.ok) throw new Error("Failed to fetch messages");
//   return res.json();
// }

// export async function sendMessage(userId: string, content: string): Promise<IMessage> {
//   const res = await fetch(`/api/admin/messages`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ userId, content }),
//   });
//   if (!res.ok) throw new Error("Failed to send message");
//   return res.json();
// }


import { IUser, IMessage } from "@/store/adminChatStore";

const API_BASE = "/api/admin";

export async function getUsers(): Promise<IUser[]> {
  try {
    const res = await fetch(`${API_BASE}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getMessages(userId: string): Promise<IMessage[]> {
  try {
    const res = await fetch(`${API_BASE}/messages/${userId}`);
    if (!res.ok) throw new Error("Failed to fetch messages");
    return res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function sendMessage(userId: string, content: string): Promise<IMessage> {
  try {
    const res = await fetch(`${API_BASE}/messages/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
