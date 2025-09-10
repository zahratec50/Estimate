
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditableField } from "./EditableField";
import { useAppStore } from "@/store/useAppStore";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

interface ProfileHeaderProps {
  name: string;
  email: string;
  userType: string;
}

export const ProfileHeader = ({ name, email, userType }: ProfileHeaderProps) => {
  const userAvatar = useAppStore((state) => state.userAvatar);
  const setUserAvatar = useAppStore((state) => state.setUserAvatar);
  const userPassword = useAppStore((state) => state.userPassword);
  const setUserPassword = useAppStore((state) => state.setUserPassword);

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (userAvatar) setPreview(userAvatar);
  }, [userAvatar]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      setUserAvatar(result);
    };
    reader.readAsDataURL(file);
  };

  const handlePasswordChange = (value: string) => {
    // قانون پسورد: حداقل 8 و حداکثر 64 کاراکتر
    if (value.length < 8 || value.length > 64) {
      showErrorToast({
        title: "Invalid Password",
        description: "Password must be between 8 and 64 characters",
      });
      return;
    }
    setUserPassword(value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 p-4 bg-white dark:bg-secondary-900 rounded-lg shadow-md transition-all">
      <div className="relative group">
        <Avatar className="w-20 h-20">
          {preview ? <AvatarImage src={preview} alt={name} /> : <AvatarFallback>{name[0]}</AvatarFallback>}
        </Avatar>
        <input
          type="file"
          aria-label="Upload avatar"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
        />
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold rounded-full transition-opacity">
          Change
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        <EditableField label="Name" value={name} onChange={(v) => useAppStore.getState().setUserName(v)} />
        <EditableField label="Email" value={email} onChange={(v) => useAppStore.getState().setUserEmail(v)} />
        <EditableField label="User Type" value={userType} onChange={(v) => useAppStore.getState().setUserType(v)} />
        <EditableField
          label="Password"
          type="password"
          value={userPassword}
          onChange={handlePasswordChange}
        />
      </div>
    </div>
  );
};
