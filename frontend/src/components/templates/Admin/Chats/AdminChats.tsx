"use client";

import React, { useEffect, useState, useCallback } from "react";
import UserList from "./UserList";
import AdminChatRoom from "./AdminChatRoom";
import UserDetailPanel from "./UserDetailPanel";
import { useAdminChatStore } from "@/store/adminChatStore";
import type { IUserDTO } from "@/lib/types";

export default function AdminChats() {
  const {
    users,
    setUsers,
    adminSelf,
    setAdminSelf,
    selectedUser,
    setSelectedUser,
    messages,
    loading,
    loadMessages,
    sendMessage,
    markAsRead,
  } = useAdminChatStore();

  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [abortSignal, setAbortSignal] = useState<AbortController | null>(null);

  // fetch current admin (self) and users
  useEffect(() => {
    let mounted = true;
    const fetchInitial = async () => {
      try {
        const [resSelf, resUsers] = await Promise.all([
          fetch("/api/auth/me", { credentials: "include" }),
          fetch("/api/admin/users", { credentials: "include" }),
        ]);

        if (!resSelf.ok) throw new Error("Failed to fetch admin self");
        const selfJson = await resSelf.json();
        const self = selfJson.user as IUserDTO;
        if (mounted) setAdminSelf(self);

        if (!resUsers.ok) throw new Error("Failed to fetch users");
        const data: IUserDTO[] = await resUsers.json();
        // sort admins first
        const sortedData = data.sort((a, b) => {
          if (a.role === "admin" && b.role !== "admin") return -1;
          if (a.role !== "admin" && b.role === "admin") return 1;
          return a.name.localeCompare(b.name);
        });
        if (mounted) {
          setUsers(sortedData);
          if (sortedData.length) {
            setSelectedUser(sortedData[0]);
          }
        }
      } catch (err: any) {
        console.error("AdminChats init error:", err.message);
      }
    };
    fetchInitial();

    return () => {
      mounted = false;
    };
  }, [setAdminSelf, setUsers, setSelectedUser]);

  // when selectedUser or adminSelf changes -> compute conversationId and load messages
  useEffect(() => {
    if (!adminSelf || !selectedUser) {
      setCurrentConversationId(null);
      return;
    }
    const convId = [adminSelf._id, selectedUser._id].sort().join("-");
    setCurrentConversationId(convId);

    // abort previous
    abortSignal?.abort();
    const ac = new AbortController();
    setAbortSignal(ac);

    (async () => {
      try {
        await loadMessages(convId);
        markAsRead(convId);
      } catch (err: any) {
        if (ac.signal.aborted) return;
        console.error("Error loading messages for conv", err.message);
      }
    })();

    return () => {
      ac.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminSelf, selectedUser]);

  const handleSelectUser = useCallback(
    (id: string) => {
      const u = users.find((x) => x._id === id) || null;
      setSelectedUser(u);
    },
    [users, setSelectedUser]
  );

  const handleSend = (content: string) => {
    if (!currentConversationId) return;
    sendMessage(content, currentConversationId);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_320px] gap-4 h-[calc(100vh-80px)] p-2">
      <UserList
        users={users}
        messages={selectedUser && currentConversationId ? messages[currentConversationId] || [] : []}
        selectedUserId={selectedUser?._id || null}
        onSelectUser={(id) => handleSelectUser(id)}
      />

      <AdminChatRoom
        messages={selectedUser && currentConversationId ? messages[currentConversationId] || [] : []}
        selfId={adminSelf?._id || "admin"}
        onSendMessage={handleSend}
        loading={loading}
      />

      {selectedUser ? (
        <UserDetailPanel user={{
          _id: selectedUser._id,
          name: selectedUser.name,
          avatar: selectedUser.avatarUrl || selectedUser.avatarUrl || "/images/user.png",
          phone: selectedUser.phone,
          email: selectedUser.email,
          role: selectedUser.role,
          lastSeen: selectedUser.lastSeen,
        }} />
      ) : (
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow flex items-center justify-center text-gray-500">
          No user selected
        </div>
      )}
    </div>
  );
}
