"use client";
import React from "react";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";
import { MdAssessment } from "react-icons/md";
import Link from "next/link";
import { useChatStore } from "@/store/chatStore";
import ConversationItem from "./ConversationItem";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IConversationDTO {
  _id: string;
  members: string[];
  createdAt: string; // تاریخ ایجاد
  unreadBy: Record<string, number>; // شمارش پیام‌های خوانده نشده
  // ممکنه فیلدهای دیگه‌ای هم داشته باشه
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const {
    peers,
    activeConversation,
    setActiveConversation,
    onlineUserIds,
    self,
  } = useChatStore();

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 bg-black/40 z-40 transition-opacity md:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />

      <aside
        className={clsx(
          "fixed md:static top-0 left-0 h-full bg-white shadow-xl z-50 transition-transform duration-300 w-64",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <button
          onClick={onClose}
          aria-label="close"
          className="absolute top-4 right-4 md:hidden p-2 rounded-full hover:bg-gray-200"
        >
          <IoClose size={24} />
        </button>
        <div className="flex flex-col justify-between h-full p-4">
          <div className="space-y-2">
            <div className="flex flex-col items-center mb-6">
              <img
                src="/images/logo-black.png"
                alt="logo"
                className="w-16 h-16"
              />
            </div>
            {peers.map((peer) => (
              <ConversationItem
                key={peer._id}
                peer={peer}
                active={
                  !!activeConversation &&
                  activeConversation.members.includes(peer._id)
                }
                online={onlineUserIds.has(peer._id)}
                onClick={() => {
                  setActiveConversation({
                    _id: [self!._id, peer._id].sort().join("-"),
                    members: [self!._id, peer._id],
                    createdAt: new Date().toISOString(),
                    unreadBy: { [self!._id]: 0, [peer._id]: 0 },
                  });
                  onClose();
                }}
              />
            ))}
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-200"
          >
            <MdAssessment className="size-7" /> Dashboard
          </Link>
        </div>
      </aside>
    </>
  );
}
