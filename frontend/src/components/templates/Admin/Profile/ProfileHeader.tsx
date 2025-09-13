"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

interface AdminProfile {
  id?: string;
  name: string;
  email: string;
  avatar?: string | null;
}

export default function ProfileHeader() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get("/api/admin/me", { withCredentials: true });
        if (!mounted) return;
        setProfile(res.data);
      } catch (err: any) {
        console.error("fetch profile:", err?.response?.data || err);
        showErrorToast({
            title: 'Error',
            description: err?.response?.data?.message || "Failed to load profile",
            actionLabel: "OK",
            onAction: () => {}
        })
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // simple skeleton visuals while loading
  if (loading) {
    return (
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-secondary-700 animate-pulse" />
        <div className="flex-1">
          <div className="h-6 bg-gray-200 dark:bg-secondary-700 rounded w-56 mb-2 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-secondary-700 rounded w-40 animate-pulse" />
        </div>
        <div className="w-28 h-10 bg-gray-200 dark:bg-secondary-700 rounded animate-pulse" />
      </div>
    );
  }

  if (!profile) {
    return <div className="text-sm text-red-500">Unable to load profile</div>;
  }

  return (
    <div className="flex items-center gap-6">
      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-secondary-700 flex-shrink-0">
        <Image
          src={profile.avatar || "/images/avataradmin.png"}
          alt="avatar"
          width={96}
          height={96}
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {profile.name}
        </h1>
        <p className="text-sm text-muted-foreground">{profile.email}</p>
        <p className="mt-1 text-xs text-muted-foreground font-roboto font-semibold">Admin</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            // dispatch custom event to open profile form inside tabs
            window.dispatchEvent(new CustomEvent("open-profile-edit"));
          }}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
