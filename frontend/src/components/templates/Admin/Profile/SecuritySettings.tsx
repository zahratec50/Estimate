"use client";

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
import { showSuccessToast } from "@/components/modules/toasts/SuccessToast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormSchema = z.infer<typeof schema>;

export default function SecuritySettings() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormSchema) => {
    try {
      await axios.post("/api/admin/change-password", values, {
        withCredentials: true,
      });
      showSuccessToast({
        title: "success",
        description: "Password changed",
        actionLabel: "OK",
        onAction: () => {},
      });

      reset();
    } catch (err: any) {
      console.error("change-pass:", err?.response?.data || err);
      showErrorToast({
        title: "Error",
        description:
          err?.response?.data?.message || "Failed to change password",
        actionLabel: "OK",
        onAction: () => {},
      });
    }
  };

  return (
    <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Security</h3>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
            Current password
          </label>
          <Input type="password" {...register("currentPassword")} />
          {errors.currentPassword && (
            <p className="text-xs text-red-500 mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
            New password
          </label>
          <Input type="password" {...register("newPassword")} />
          {errors.newPassword && (
            <p className="text-xs text-red-500 mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
            Confirm password
          </label>
          <Input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Change password"}
          </Button>
        </div>
      </form>
    </div>
  );
}
