"use client";

import { useAppStore } from "@/store/useAppStore";
import { ProfileHeader } from "./ProfileHeader";
import { EditableFirstQuiz } from "./EditableFirstQuiz";
import { useCallback } from "react";

export default function ProfilePage() {
  const { userName, userEmail, userType, setUserName, setUserEmail, setUserType } = useAppStore();

  const handleFieldChange = useCallback((field: string, value: string) => {
    if (field === "name") setUserName(value);
    else if (field === "email") setUserEmail(value);
    else if (field === "userType") setUserType(value);
  }, [setUserName, setUserEmail, setUserType]);

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <ProfileHeader
        name={userName}
        email={userEmail}
        userType={userType}
        onChange={handleFieldChange}
      />
      <h2 className="text-xl font-semibold mb-4">Your First Quiz Answers</h2>
      <EditableFirstQuiz />
    </div>
  );
}
