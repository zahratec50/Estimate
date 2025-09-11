"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ImProfile } from "react-icons/im";
import { BsClipboardData } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";

interface InfoProps {
  size: string;
}

const TopbarUserInfo = ({ size }: InfoProps) => {
  const { userName, userAvatar, isRegistered } = useAppStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<"user" | "admin">("user"); // پیش‌فرض user
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  if (!isRegistered) return null;

  // دریافت رول کاربر از API
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setRole(data.role); // فرض می‌کنیم پاسخ { role: "user" | "admin" }
      } catch (err) {
        console.error(err);
      }
    };
    fetchRole();
  }, []);

  const handleNavigation = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  const handleSignOut = async () => {
    setOpen(false);
    try {
      await fetch("/api/auth/signout", { method: "POST" });
      router.push("/");
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative hidden sm:block">
      <button
        ref={triggerRef}
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer p-0 rounded-full"
      >
        <Avatar className={`rounded-full ${size}`}>
          {userAvatar ? (
            <AvatarImage
              src={userAvatar}
              alt={userName}
              className="object-cover"
            />
          ) : (
            <AvatarFallback>{userName[0]}</AvatarFallback>
          )}
        </Avatar>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[70px] right-4 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-[9999] overflow-hidden"
          >
            {role === "user" ? (
              <>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  onClick={() => handleNavigation("/dashboard")}
                >
                  <BsClipboardData />
                  Dashboard
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  onClick={() => handleNavigation("/dashboard/profile")}
                >
                  <ImProfile />
                  Profile
                </button>
              </>
            ) : (
              <>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  onClick={() => handleNavigation("/admin")}
                >
                  <BsClipboardData />
                  Admin Panel
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  onClick={() => handleNavigation("/admin/profile")}
                >
                  <ImProfile />
                  Admin Profile
                </button>
              </>
            )}
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              onClick={handleSignOut}
            >
              <IoExitOutline />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopbarUserInfo;
