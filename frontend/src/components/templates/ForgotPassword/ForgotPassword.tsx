"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { redirect, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
import { showSuccessToast } from "@/components/modules/toasts/SuccessToast";
import Image from "next/image";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
});
type FormData = z.infer<typeof schema>;

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      if (!res.ok) throw new Error("Failed to send reset code.");
      showSuccessToast({
        title: "Reset code sent",
        description: "Please check your email inbox.",
      });
      router.push("/verifyCode");
    } catch (err: any) {
      showErrorToast({
        title: "Error",
        description: err.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted px-4">
      <div className="text-center mb-8">
        <Image
          src="/images/logoBlack.png"
          alt="logo"
          width={100}
          height={100}
        />
      </div>
      <div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-2">Forgot Your Password?</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Enter your email address below and we'll send you a code to reset
            your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              {...register("email")}
              placeholder="you@example.com"
              className={`${errors.email ? "border-red-500" : ""} h-12 mb-4`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full text-white bg-secondary-500 hover:bg-secondary-600 text-base h-12" disabled={loading}>
            {loading ? "Sending..." : "Send Code"}
          </Button>
        </form>
      </div>
    </div>
  );
}
