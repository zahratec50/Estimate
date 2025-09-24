"use client";

import React, { memo, useState, useEffect } from "react";
import { IoMenu, IoNotificationsOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeSwitcher from "@/components/modules/Theme/Theme";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import axios from "axios";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
import { useAdminChatStore } from "@/store/adminChatStore";

interface TopbarProps {
  onMenuClick: () => void;
}

interface AdminProfile {
  id?: string;
  name: string;
  email: string;
  avatar?: string | null;
}

function Topbar({ onMenuClick }: TopbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notifications = [
    { label: "New question request", path: "/admin/questionCreationForm" },
    { label: "User registered", path: "/admin/users" },
    { label: "System update", path: "/admin/settings" },
  ];

  const [profile, setProfile] = useState<AdminProfile | null>(null);

  const router = useRouter();

  const { messages, adminSelf } = useAdminChatStore();

  const unreadSenders = React.useMemo(() => {
    const allMsgs = Object.values(messages).flat();
    const uniqueSenders = new Set<string>();
    allMsgs.forEach((msg) => {
      if (
        msg.senderId !== adminSelf?._id && // فقط کاربرها
        msg.status !== "seen" // فقط خوانده‌نشده
      ) {
        uniqueSenders.add(msg.senderId);
      }
    });
    return Array.from(uniqueSenders);
  }, [messages, adminSelf?._id]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get("/api/admin/me", { withCredentials: true });
        if (!mounted) return;
        setProfile(res.data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          console.log("User is logged out, skipping fetch.");
          return;
        }
        showErrorToast({
          title: "Error",
          description: err?.response?.data?.message || "Failed to load profile",
          actionLabel: "OK",
          onAction: () => {},
        });
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <header className="flex items-center justify-between bg-white dark:bg-secondary-800 p-4 shadow-md border-b border-gray-300 sticky top-0 z-20">
      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
        onClick={onMenuClick}
        title="Toggle Menu"
      >
        <IoMenu size={24} />
      </button>

      {/* Title */}
      <h1 className="text-sm md:text-xl font-semibold">
        Welcome back, {profile?.name} 👋
      </h1>

      {/* Search */}
      <div className="hidden md:flex flex-1 items-center gap-4 ml-4">
        <div className="relative w-full max-w-sm">
          <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-10 w-full" />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex">
          <ThemeSwitcher />
        </div>

        {/* Notifications */}
        <DropdownMenu
          open={notificationsOpen}
          onOpenChange={setNotificationsOpen}
        >
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded dark:hover:bg-secondary-700">
              <IoNotificationsOutline className="size-5 md:size-6" />
              {unreadSenders.length > 0 && ( // 🔑 نمایش فقط در صورت داشتن پیام
                <span className="absolute top-0.5 right-0.5 md:top-0 md:right-0 bg-red-500 text-white rounded-full w-3 h-3 md:w-4 md:h-4 text-xs flex items-center justify-center">
                  {unreadSenders.length}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 max-h-60 overflow-auto data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          >
            {notifications.map((note, i) => (
              <DropdownMenuItem key={i} onClick={() => router.push(note.path)}>
                {note.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer rounded-full">
              <AvatarImage
                src={profile?.avatar || "/images/avataradmin.png"}
                alt="Admin"
                className="object-cover"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          >
            <DropdownMenuItem onClick={() => router.push("/admin/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/")}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default memo(Topbar);
