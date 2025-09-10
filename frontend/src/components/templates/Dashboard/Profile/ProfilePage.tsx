"use client";

import { useAppStore } from "@/store/useAppStore";
import { ProfileHeader } from "./ProfileHeader";
import { EditableFirstQuiz } from "./EditableFirstQuiz";

export default function ProfilePage() {
  const { userName, userEmail, userType } = useAppStore();

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto space-y-8">
      <ProfileHeader name={userName} email={userEmail} userType={userType} />
      <EditableFirstQuiz />
    </div>
  );
}
