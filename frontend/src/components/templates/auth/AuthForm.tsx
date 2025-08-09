"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, type SignInResponse } from "next-auth/react";
import Input from "@/components/templates/auth/Input/Input";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

// Schema بدون optional چون اعتبار خالی بودن رو خودمون هندل می‌کنیم
const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must only contain letters and spaces"),

  email: z
    .string()
    .email("Invalid email format")
    .max(100, "Email must be less than 100 characters")
    .regex(emailRegex, { message: "Please enter a valid email address" }),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

export type FormData = z.infer<typeof schema>;

export default function AuthForm({ isLogin }: { isLogin: boolean }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // loadingProvider: 'google' | 'apple' | null
  const [loadingProvider, setLoadingProvider] = useState<"google" | "apple" | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  // --- فرم محلی (ثبت نام / لاگین با فرم معمولی) ---
  const handleCustomSubmit = async () => {
    const { name, email, password } = getValues();

    // بررسی خالی بودن فیلدها
    if ((!isLogin && !name?.trim()) || !email?.trim() || !password?.trim()) {
      showErrorToast({
        title: "Incomplete Form",
        description: "Please fill out all fields before continuing",
        actionLabel: "OK",
        onAction: () => {},
      });
      return;
    }

    // اعتبارسنجی با schema
    const isValid = await trigger();
    if (!isValid) return;

    // اینجا درخواست به API خودت (signup/login) رو می‌زنی.
    // برای الان فقط لاگ می‌کنیم؛ اگر backend داری میشه axios.post کرد.
    console.log("Form submitted:", { name, email, password });

    // مثال: بعد از موفقیت ریدایرکت
    // router.push("/dashboard");
  };

  // --- Social sign-in handlers ---
  const handleSocialSignIn = async (provider: "google" | "apple") => {
    try {
      setLoadingProvider(provider);
      // redirect: false => دریافت پاسخ به صورت JS و انجام ریدایرکت دستی
      const result = (await signIn(provider, { redirect: false, callbackUrl: "/dashboard" })) as
        | SignInResponse
        | undefined;

      if (!result) {
        // بعضی کانفیگ‌ها ممکنه به صورت redirect عمل کنن و undefined برگردانند.
        // اجازه بدیم مرورگر ریدایرکت کنه (چیزی برای انجام نیست)
        return;
      }

      if ("error" in result && result.error) {
        showErrorToast({
          title: `${provider === "google" ? "Google" : "Apple"} login failed`,
          description: result.error || "Authentication failed",
          actionLabel: "OK",
          onAction: () => {},
        });
        return;
      }

      // اگر URL برگشته، هدایت می‌کنیم
      if ("url" in result && result.url) {
        // بعضی ورژن‌ها url دارند
        router.push(result.url);
        return;
      }

      // fallback
      router.push("/dashboard");
    } catch (err) {
      console.error("Social sign-in error:", err);
      showErrorToast({
        title: "Authentication error",
        description: "Unable to sign in. Please try again.",
        actionLabel: "OK",
        onAction: () => {},
      });
    } finally {
      setLoadingProvider(null);
    }
  };

  const onSubmit = () => {
    // استفاده از handleCustomSubmit بجای handleSubmit از react-hook-form
    // چون ما از getValues و trigger در handleCustomSubmit استفاده می‌کنیم
    handleCustomSubmit();
  };

  useEffect(() => {
    // نمایش خطاهای اعتبارسنجی به صورت toast (همان رفتار قبلی)
    if (!isLogin && errors.name) {
      showErrorToast({
        title: "Invalid Name",
        description: errors.name?.message || "",
        actionLabel: "OK",
        onAction: () => {},
      });
    }
    if (errors.email) {
      showErrorToast({
        title: "Invalid Email",
        description: errors.email?.message || "",
        actionLabel: "OK",
        onAction: () => {},
      });
    }
    if (errors.password) {
      showErrorToast({
        title: "Invalid Password",
        description: errors.password?.message || "",
        actionLabel: "OK",
        onAction: () => {},
      });
    }
  }, [errors, isLogin]);

  return (
    <div className="w-full max-w-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-3 text-fontFamily-roboto"
        aria-label={isLogin ? "Login form" : "Signup form"}
      >
        {!isLogin && (
          <Input name="name" labelName="Name" type="text" register={register} disabled={isSubmitting || !!loadingProvider} />
        )}

        <Input name="email" labelName="Email" type="email" register={register} disabled={isSubmitting || !!loadingProvider} />

        <Input
          name="password"
          labelName="Password"
          type={showPassword ? "text" : "password"}
          register={register}
          icon2={<LuEye className="w-4 h-4" />}
          icon1={<LuEyeClosed className="w-4 h-4" />}
          toggle={() => setShowPassword((prev) => !prev)}
          disabled={isSubmitting || !!loadingProvider}
        />

        {isLogin ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" aria-label="Remember Me" className="w-4 h-4 accent-secondary-500" />
              <span className="text-sm font-medium text-black-50">Remember Me</span>
            </div>
            <Link href="/forgot-password" className="text-sm text-primary-600 font-medium hover:underline">
              Forgot Password?
            </Link>
          </div>
        ) : (
          <div className="flex items-center text-sm gap-2">
            <input type="checkbox" aria-label="Terms & Privacy" className="w-4 h-4 accent-secondary-500" />
            <span className="text-black-50">I agree to the Terms & Privacy</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !!loadingProvider}
          className="w-full h-11 bg-primary-200 text-white font-semibold rounded-lg hover:bg-primary-400 transition disabled:opacity-60"
        >
          {isSubmitting ? (isLogin ? "Logging in..." : "Signing up...") : isLogin ? "Login" : "Sign up"}
        </button>
      </form>
    </div>
  );
}
