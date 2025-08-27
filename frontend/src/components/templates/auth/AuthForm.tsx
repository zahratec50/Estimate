"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as z from "zod";
import Input from "@/components/templates/auth/Input/Input";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import axios, { AxiosResponse } from "axios";
import { useAppStore } from "@/store/useAppStore";

// ✅ Regex برای ایمیل
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

// ✅ اسکیما برای Login
const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .max(100, "Email must be less than 100 characters")
    .regex(emailRegex, { message: "Please enter a valid email address" }),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters"),
});

// ✅ اسکیما برای Signup
const signupSchema = loginSchema.extend({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must only contain letters and spaces"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

interface UserResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  accessToken?: string;
  message: string;
}

export default function AuthForm({ isLogin }: { isLogin: boolean }) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const router = useRouter();

  const {setRegistered} = useAppStore()

  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormData | SignupFormData>({
    mode: "onSubmit",
  });

  const handleFormSubmit = async () => {
    clearErrors();
    const values = getValues();

    if (
      (!isLogin && !(values as SignupFormData).name?.trim()) ||
      !values.email?.trim() ||
      !values.password?.trim()
    ) {
      showErrorToast({
        title: "Incomplete Form",
        description: "Please fill out all fields before continuing.",
        actionLabel: "OK",
        onAction: () => {},
      });
      return;
    }

    if (!isLogin && !termsChecked) {
      showErrorToast({
        title: "Terms & Privacy",
        description: "You must agree to the Terms & Privacy to sign up.",
        actionLabel: "OK",
        onAction: () => {},
      });
      return;
    }

    // ✅ انتخاب اسکیما بر اساس isLogin
    const schema = isLogin ? loginSchema : signupSchema;
    const parseResult = schema.safeParse(values);

    if (!parseResult.success) {
      parseResult.error.issues.forEach(({ path, message }) => {
        setError(path[0] as keyof LoginFormData, { type: "manual", message });
      });
      return;
    }

    try {
      let userRole: string;
      if (isLogin) {
        const axiosResponse: AxiosResponse<UserResponse> = await axios.post(
          "/api/auth/signin",
          {
            email: values.email,
            password: values.password,
            rememberMe,
          },
          { withCredentials: true }
        );

        userRole = axiosResponse.data.user.role;
      } else {
        const signupData = values as SignupFormData;
        const axiosResponse: AxiosResponse<UserResponse> = await axios.post(
          "/api/auth/signup",
          {
            name: signupData.name,
            email: signupData.email,
            password: signupData.password,
          },
          { headers: { "Content-Type": "application/json" } }
        );

        userRole = axiosResponse.data.user.role;
      }
      setRegistered(true)

      if (userRole === "admin") {
        router.push("/admin"); // مسیر صفحه ادمین
      } else {
        router.push("/dashboard"); // مسیر کاربران معمولی
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      showErrorToast({
        title: isLogin ? "Login Failed" : "Registration Failed",
        description: message,
        actionLabel: "OK",
        onAction: () => {},
      });
    }
  };

  useEffect(() => {
    if (!isLogin && "name" in errors && errors.name)
      showErrorToast({
        title: "Invalid Name",
        description: errors.name.message || "",
        actionLabel: "OK",
        onAction: () => {},
      });
    if (errors.email)
      showErrorToast({
        title: "Invalid Email",
        description: errors.email.message || "",
        actionLabel: "OK",
        onAction: () => {},
      });
    if (errors.password)
      showErrorToast({
        title: "Invalid Password",
        description: errors.password.message || "",
        actionLabel: "OK",
        onAction: () => {},
      });
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
        <Input
          name="name"
          labelName="Name"
          type="text"
          register={register}
          error={"name" in errors ? errors.name?.message : undefined}
        />
      )}
      <Input
        name="email"
        labelName="Email"
        type="email"
        register={register}
        error={errors.email?.message}
      />
      <Input
        name="password"
        labelName="Password"
        type={showPassword ? "text" : "password"}
        register={register}
        icon2={<LuEye className="w-4 h-4" />}
        icon1={<LuEyeClosed className="w-4 h-4" />}
        toggle={() => setShowPassword((prev) => !prev)}
        error={errors.password?.message}
      />

      {isLogin ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              aria-label="Remember Me"
              className="w-4 h-4 accent-secondary-500"
            />
            <span className="text-sm font-medium text-black-50">
              Remember Me
            </span>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-primary-600 font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={termsChecked}
            onChange={(e) => setTermsChecked(e.target.checked)}
            aria-label="Terms & Privacy"
            className="w-4 h-4 accent-secondary-500"
          />
          <span className="text-black-50">I agree to the Terms & Privacy</span>
        </div>
      )}

      <button
        type="submit"
        disabled={!isLogin && !termsChecked}
        className={`w-full h-11 text-white font-semibold rounded-lg transition ${
          !isLogin && !termsChecked
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary-200 hover:bg-primary-200"
        }`}
      >
        {isLogin ? "Login" : "Sign up"}
      </button>
    </form>
  );
}
