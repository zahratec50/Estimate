"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  userId: string;
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        // فرض می‌کنیم توکن رو از کوکی HttpOnly می‌فرستیم یا از localStorage
        const token = localStorage.getItem("refreshToken");
        console.log("token: ", token);
        
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        const { data } = await axios.post("/api/auth/me", { token });
        setUser(data.userId ? { userId: data.userId } : null);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return { user, loading, setUser };
}
