"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as z from "zod";
import Input from "@/components/templates/auth/Input/Input";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import axios from "axios";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit", // فقط موقع submit اعتبارسنجی کن
  });

  // تابع ارسال فرم دستی
  const handleFormSubmit = async() => {
    clearErrors();

    const values = getValues();

    // چک خالی بودن
    if ((!isLogin && !values.name?.trim()) || !values.email?.trim() || !values.password?.trim()) {
      showErrorToast({
        title: "Incomplete Form",
        description: "Please fill out all fields before continuing.",
        actionLabel: "OK",
        onAction: () => {},
      });
      return;
    }

    // اعتبارسنجی کامل با Zod
    const parseResult = schema.safeParse(values);

    if (!parseResult.success) {
      // خطاهای zod رو به react-hook-form منتقل کن تا تو UI هم نمایش داده بشه
      parseResult.error.issues.forEach(({ path, message }) => {
        setError(path[0] as keyof FormData, { type: "manual", message });
      });
      return;
    }

    try {
      if (isLogin) {
        await axios.post(
          "/api/auth/signin",
          { email: values.email, password: values.password },
          { withCredentials: true } // مهم برای ارسال کوکی
        );
        alert("Login not implemented yet");
      } else {
        // ارسال اطلاعات برای ثبت‌نام
        await axios.post("/api/auth/signup", {
          name: values.name,
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

        alert("User registered successfully!");

        router.push("/dashboard");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Something went wrong";

      showErrorToast({
        title: isLogin ? "Login Failed" : "Registration Failed",
        description: message,
        actionLabel: "OK",
        onAction: () => {},
      });
      router.push("/");
    }

    // اگه همه چی درست بود، فرم رو ارسال کن
    console.log("Form submitted:", values);

    // مثلا ریدایرکت یا ارسال داده به سرور اینجا انجام میشه
    router.push("/dashboard");
  };

  useEffect(() => {
    if (errors.name) {
      showErrorToast({
        title: "Invalid Name",
        description: errors.name.message || "",
        actionLabel: "OK",
        onAction: () => {},
      });
    }
    if (errors.email) {
      showErrorToast({
        title: "Invalid Email",
        description: errors.email.message || "",
        actionLabel: "OK",
        onAction: () => {},
      });
    }
    if (errors.password) {
      showErrorToast({
        title: "Invalid Password",
        description: errors.password.message || "",
        actionLabel: "OK",
        onAction: () => {},
      });
    }
  }, [errors]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleFormSubmit();
      }}
      className="w-full max-w-sm space-y-3 text-fontFamily-roboto"
    >
      {!isLogin && (
        <Input name="name" labelName="Name" type="text" register={register} />
      )}

      <Input name="email" labelName="Email" type="email" register={register} />

      <Input
        name="password"
        labelName="Password"
        type={showPassword ? "text" : "password"}
        register={register}
        icon2={<LuEye className="w-4 h-4" />}
        icon1={<LuEyeClosed className="w-4 h-4" />}
        toggle={() => setShowPassword((prev) => !prev)}
      />

      {isLogin ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              aria-label="Remember Me"
              className="w-4 h-4 accent-secondary-500"
            />
            <span className="text-sm font-medium text-black-50">Remember Me</span>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-primary-600 font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      ) : (
        <div className="flex items-center text-sm gap-2">
          <input
            type="checkbox"
            aria-label="Terms & Privacy"
            className="w-4 h-4 accent-secondary-500"
          />
          <span className="text-black-50">I agree to the Terms & Privacy</span>
        </div>
      )}

      <button
        type="submit"
        className="w-full h-11 bg-primary-200 text-white font-semibold rounded-lg hover:bg-primary-400 transition"
      >
        {isLogin ? "Login" : "Sign up"}
      </button>
    </form>
  );
}
