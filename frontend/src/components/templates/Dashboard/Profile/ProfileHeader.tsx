"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store/useAppStore";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
import { Eye, EyeOff } from "lucide-react";

export const ProfileHeader = () => {
  const {
    userAvatar,
    setUserAvatar,
    userName,
    userEmail,
    userPassword,
    userType,
    setUserName,
    setUserEmail,
    setUserPassword,
    setUserType,
  } = useAppStore();

  const [preview, setPreview] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // فرم محلی برای ادیت
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  useEffect(() => {
    if (userAvatar) setPreview(userAvatar);
  }, [userAvatar]);

  useEffect(() => {
    setFormValues({
      name: userName || "",
      email: userEmail || "",
      password: userPassword || "",
      type: userType || "",
    });
  }, [userName, userEmail, userPassword, userType]);

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

  const handleSave = () => {
    if (formValues.password.length < 8 || formValues.password.length > 64) {
      showErrorToast({
        title: "Invalid Password",
        description: "Password must be between 8 and 64 characters",
      });
      return;
    }
    setUserName(formValues.name);
    setUserEmail(formValues.email);
    setUserPassword(formValues.password);
    setUserType(formValues.type);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 p-4 bg-white dark:bg-secondary-900 rounded-lg shadow-md transition-all">
      {/* آواتار */}
      <div className="relative group">
        <Avatar className="w-20 h-20">
          {preview ? (
            <AvatarImage src={preview} alt={userName} />
          ) : (
            <AvatarFallback>{userName?.[0]}</AvatarFallback>
          )}
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

      {/* اطلاعات کاربر */}
      <div className="flex flex-col gap-2 w-full">
        <p className="text-lg font-semibold dark:text-white">{userName}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300">{userEmail}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          User : <strong>{userType}</strong>
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-2 px-4 py-2 rounded bg-primary-400 text-white hover:bg-primary-500 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Edit Profile
            </h2>

            <input
              className="w-full p-2 border rounded"
              placeholder="Name"
              value={formValues.name}
              onChange={(e) =>
                setFormValues({ ...formValues, name: e.target.value })
              }
            />
            <input
              className="w-full p-2 border rounded"
              placeholder="Email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
            />
            <div className="relative w-full">
              <input
                className="w-full p-2 pr-10 border rounded"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({ ...formValues, password: e.target.value })
                }
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <input
              className="w-full p-2 border rounded"
              placeholder="User Type"
              value={formValues.type}
              onChange={(e) =>
                setFormValues({ ...formValues, type: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-primary-400 text-white hover:bg-primary-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
