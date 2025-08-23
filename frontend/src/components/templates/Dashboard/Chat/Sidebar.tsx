
"use client";

import React from "react";
import { useChatStore } from "@/store/chatStore";
import ConversationItem from "./ConversationItem";
import Link from "next/link";
import { MdAssessment } from "react-icons/md";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    peers,
    activeConversation,
    setActiveConversation,
    onlineUserIds,
    self,
  } = useChatStore();

  return (
    <>
      {/* Overlay فقط در موبایل */}
      <div
        className={clsx(
          "fixed inset-0 bg-black-50/40 z-40 transition-opacity md:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />

      <aside
        className={clsx(
          "fixed md:static top-0 left-0 h-full bg-white shadow-xl z-50 transition-transform duration-300",
          "w-64", // عرض ثابت
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
         <button
          onClick={onClose}
          aria-label="Close menu"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 md:hidden"
        >
          <IoClose size={24} />
        </button>
        <div className="flex flex-col justify-between h-full p-3 md:p-4">
          <div>
            <div className="flex flex-col items-center gap-2 mb-8">
              <img
                src="../../images/logo-Black.png"
                alt="logo"
                className="size-16"
              />
            </div>

            <div className="space-y-1">
              {peers.map((p) => (
                <ConversationItem
                  key={p._id}
                  peer={p}
                  active={
                    !!activeConversation &&
                    activeConversation.members.includes(p._id)
                  }
                  online={onlineUserIds.has(p._id)}
                  onClick={() => {
                    setActiveConversation({
                      _id: `${[self!._id, p._id].sort().join("-")}` as any,
                      members: [self!._id, p._id],
                    })
                    onClose()
                  }
                    
                  
                  }
                />
              ))}
            </div>
          </div>
          <div>
            <Link
              href="/dashboard"
              className="w-full flex items-center text-sm font-medium font-roboto gap-3 px-3 py-2 rounded-2xl text-left hover:bg-gray-200"
            >
              <MdAssessment className="text-lg size-7" />
              Dashboard
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
