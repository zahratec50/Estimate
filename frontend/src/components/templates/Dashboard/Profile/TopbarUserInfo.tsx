"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegAddressCard } from "react-icons/fa";
import { FaRegChartBar } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import axios from "axios";

const TopbarUserInfo = ({ size }: { size: string }) => {
  const { userName, userAvatar, role, setUser, isRegistered, setRegistered } =
    useAppStore();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  // Fetch user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/auth/me", { withCredentials: true });

        if (data.user) {
          setUser({
            name: data.user.name,
            avatar: data.user.avatar ?? '/images/avataradmin.png',
            role: data.user.role,
          });
          setRegistered(true);
        } else {
          setUser(undefined);
          setRegistered(false);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(undefined);
        setRegistered(false);
      } finally {
        setLoading(false); // ✅ بعد از fetch loading false می‌شود
      }
    };

    fetchData();
  }, [setUser, setRegistered]);

  // Sign out
  const handleSignOut = async () => {
    try {
      await axios.post("/api/auth/signout");
      setRegistered(false);
      setUser(undefined);
      router.push("/");
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  // Handle click outside menu
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

  // تا زمانی که داده‌ها لود نشده‌اند یا role مشخص نشده JSX را رندر نکن
  if (loading || !role) return null;

  return (
    <div className="relative block">
      <button
        ref={triggerRef}
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer rounded-full flex items-center justify-center"
      >
        <Avatar className={`rounded-full ${size}`}>
          {userAvatar ? (
            <AvatarImage src={userAvatar} alt={userName} />
          ) : (
            <AvatarFallback>{userName?.[0] || "U"}</AvatarFallback>
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
            className="fixed top-[70px] right-4 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-[9999]"
          >
            {role === "user" ? (
              <>
                <button
                  onClick={() => handleNavigation("/dashboard")}
                  className="menu-item flex items-center gap-2 w-full px-4 py-2 text-secondary-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaRegChartBar /> Dashboard
                </button>
                <button
                  onClick={() => handleNavigation("/dashboard/profile")}
                  className="menu-item flex items-center gap-2 w-full px-4 py-2 text-secondary-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaRegAddressCard /> Profile
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation("/admin")}
                  className="menu-item flex items-center gap-2 w-full px-4 py-2 text-secondary-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaRegChartBar /> Admin Panel
                </button>
                <button
                  onClick={() => handleNavigation("/admin/profile")}
                  className="menu-item flex items-center gap-2 w-full px-4 py-2 text-secondary-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaRegAddressCard /> Admin Profile
                </button>
              </>
            )}
            <button
              onClick={handleSignOut}
              className="menu-item flex items-center gap-2 w-full px-4 py-2 text-secondary-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <IoExitOutline /> Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopbarUserInfo;

