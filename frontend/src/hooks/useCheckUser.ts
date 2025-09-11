"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAppStore } from "@/store/useAppStore";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

export default function useCheckUser() {
  const setUserId = useAppStore((state) => state.setUserId);
  const setUserName = useAppStore((state) => state.setUserName);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await axios.get("/api/auth/me", {
          withCredentials: true,
        });

        if (data.user?.userId) {
          setUserId(data.user.userId);
          setUserName(data.user.name || "");
        } else {
          setUserId("");
          setUserName("");
        }
      } catch (err: any) {
        setUserId("");
        setUserName("");
        showErrorToast?.({
          title: "User check failed",
          description: err?.message || "Unable to fetch user data",
        });
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [setUserId, setUserName]);

  return { loading };
}
