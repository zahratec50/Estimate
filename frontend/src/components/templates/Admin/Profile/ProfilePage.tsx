"use client";

import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import { Toaster } from "react-hot-toast";

export default function ProfilePage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-12">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto">
        {/* Card wrapper for consistent spacing */}
        <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-md p-6 md:p-8">
          <ProfileHeader />
          <div className="mt-6">
            <ProfileTabs />
          </div>
        </div>
      </div>
    </div>
  );
}
