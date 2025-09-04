"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
import { showSuccessToast } from "@/components/modules/toasts/SuccessToast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoCloseOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
});

type FormSchema = z.infer<typeof schema>;

interface AdminProfile {
  id?: string;
  name: string;
  email: string;
  avatar?: string | null;
}

export default function ProfileForm({
  openEditor = false,
}: {
  openEditor?: boolean;
}) {
  const [serverProfile, setServerProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [editing, setEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  // fetch profile
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get<AdminProfile>("/api/admin/me", {
          withCredentials: true,
        });
        if (!mounted) return;
        setServerProfile(res.data);
        reset({ name: res.data.name, email: res.data.email });
      } catch (err: any) {
        console.error("profile fetch:", err?.response?.data || err);
        showErrorToast({
          title: "Error",
          description: err?.response?.data?.message || "Failed to load profile",
          actionLabel: "OK",
          onAction: () => {},
        });
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [reset]);

  // open editor when header clicked
  useEffect(() => {
    if (openEditor) setEditing(true);
  }, [openEditor]);

  const onSubmit = async (values: FormSchema) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      if (avatarFile) formData.append("avatar", avatarFile);

      const res = await axios.put("/api/admin/me", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setServerProfile(res.data.admin);
      reset({ name: res.data.admin.name, email: res.data.admin.email });
      setAvatarFile(null);
      setAvatarPreview(null);
      setEditing(false);
      showSuccessToast({
        title: "success",
        description: "Profile updated",
        actionLabel: "OK",
        onAction: () => {},
      });
    } catch (err: any) {
      console.error("save profile:", err?.response?.data || err);
      showErrorToast({
        title: "Error",
        description: err?.response?.data?.message || "Failed to save profile",
        actionLabel: "OK",
        onAction: () => {},
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatar = (file?: File | null) => {
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  if (loading && !serverProfile) {
    return (
      <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg shadow">
        <div className="h-40 animate-pulse bg-gray-100 dark:bg-secondary-700 rounded" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-secondary-700 p-6 rounded-lg rounded-tl-none shadow">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 dark:bg-secondary-700">
          <img
            src={
              avatarPreview ||
              serverProfile?.avatar ||
              "/images/avatardefault.png"
            }
            alt="avatar"
            className="object-cover w-24 h-24 rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {serverProfile?.name}
          </div>
          <div className="text-sm text-muted-foreground">
            {serverProfile?.email}
          </div>
        </div>

        <div>
          <button
            onClick={() => setEditing((v) => !v)}
            className="px-3 py-2 rounded "
          >
            {editing ? <IoCloseOutline className="size-5" /> : <CiEdit className="size-5" />}
          </button>
        </div>
      </div>

      {editing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <Input {...register("name")} defaultValue={serverProfile?.name} />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <Input {...register("email")} defaultValue={serverProfile?.email} />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Avatar
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded dark:bg-secondary-800">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files && handleAvatar(e.target.files[0])
                  }
                />
                Upload
              </label>
              <span className="text-sm text-muted-foreground">
                PNG, JPG up to 2MB
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              className="dark:border-none dark:bg-secondary-600"
              variant="outline"
              type="button"
              onClick={() => {
                reset({
                  name: serverProfile?.name || "",
                  email: serverProfile?.email || "",
                });
                setAvatarPreview(null);
                setAvatarFile(null);
                setEditing((v) => !v)
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="dark:hover:bg-secondary-600">
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-sm text-muted-foreground">
          Click{" "}
          <button className="underline" onClick={() => setEditing(true)}>
            Edit
          </button>{" "}
          to update profile.
        </div>
      )}
    </div>
  );
}
