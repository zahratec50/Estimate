"use client";

import React, { memo, useState } from "react";
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

interface TopbarProps {
  onMenuClick: () => void;
}

function Topbar({ onMenuClick }: TopbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notifications = ["New project request", "User registered", "System update"];

  const router = useRouter()

  return (
    <header className="flex items-center justify-between bg-white dark:bg-secondary-800 p-4 shadow-md border-b border-gray-300 sticky top-0 z-20">
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-secondary-700"
        onClick={onMenuClick}
        title="Toggle Menu"
      >
        <IoMenu size={24} />
      </button>

      {/* Title */}
      <h1 className="text-sm md:text-xl font-semibold">Welcome back, Admin 👋</h1>

      {/* Search */}
      <div className="hidden md:flex flex-1 items-center gap-4 ml-4">
        <div className="relative w-full max-w-sm">
          <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-10 w-full" />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex">
          <ThemeSwitcher />
        </div>

        {/* Notifications */}
        <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded dark:hover:bg-secondary-700">
              <IoNotificationsOutline className="size-4 md:size-6" />
              <span className="absolute top-0.5 right-0.5 md:top-0 md:right-0 bg-red-500 text-white rounded-full w-3 h-3 md:w-4 md:h-4 text-xs flex items-center justify-center">
                {notifications.length}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 max-h-60 overflow-auto data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          >
            {notifications.length === 0 ? (
              <p className="text-sm text-muted-foreground p-2">No notifications</p>
            ) : (
              notifications.map((note, i) => (
                <DropdownMenuItem key={i}>{note}</DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src="/images/avatardefault.png"
                alt="Admin"
                className="size-8"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
          >
            <DropdownMenuItem onClick={() => router.push('/admin/profile')}>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default memo(Topbar);
