"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useUpdateUser } from "@/hooks/useUsers";
import { showSuccessToast } from "@/components/modules/toasts/SuccessToast";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
import CustomSelect from "../../CustomSelect/CustomSelect";

interface UserEditModalProps {
  user: any;
  onClose: () => void;
}

export default function UserEditModal({ user, onClose }: UserEditModalProps) {
  const [role, setRole] = useState(user.role);
  const [isBanned, setIsBanned] = useState(user.isBanned);
  const [mounted, setMounted] = useState(false);
  const updateUser = useUpdateUser();

  // فقط وقتی کامپوننت mount شد Portal را فعال می‌کنیم
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSave = async () => {
    try {
      await updateUser.mutateAsync({ userId: user._id, role, isBanned });
      showSuccessToast({
        title: "User Updated",
        description: "The user has been updated successfully.",
      });
      onClose();
    } catch (error) {
      showErrorToast({
        title: "Error",
        description: "Failed to update user.",
      });
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Overlay کل صفحه */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-[10000] bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-2">Edit User</h2>
        <p className="mb-4"><strong>Name:</strong> {user.name}</p>
        <p className="mb-4"><strong>Email:</strong> {user.email}</p>

        {/* Custom Select برای Role */}
        <CustomSelect
          options={["user", "admin", "consultant"]}
          value={role}
          onChange={setRole}
          name="Role"
        />

        {/* Switch برای Banned */}
        <div className="flex items-center justify-between mt-4 mb-6">
          <span className="font-medium">Banned:</span>
          <Switch checked={isBanned} onCheckedChange={setIsBanned} />
        </div>

        {/* دکمه‌ها */}
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
