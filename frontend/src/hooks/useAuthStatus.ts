"use client";
import useSWR from "swr";
import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => {
    if (!r.ok) throw new Error("Failed to fetch user");
    return r.json();
  });

export const useAuthStatus = () => {
  const { setUser, setRegistered } = useAppStore();

  const { data, error, isLoading, mutate } = useSWR("/api/auth/me", fetcher, {
    revalidateOnFocus: true,
    refreshInterval: 30000, // هر ۳۰ ثانیه بررسی مجدد
  });

  useEffect(() => {
    if (data?.user) {
      setUser({
        name: data.user.name,
        avatar: data.user.avatar,
        role: data.user.role,
      });
      setRegistered(true);
    } else if (!isLoading && !error) {
      setRegistered(false);
      setUser(undefined);
    }
  }, [data, isLoading, error, setUser, setRegistered]);

  return { data, error, isLoading, mutate };
};
