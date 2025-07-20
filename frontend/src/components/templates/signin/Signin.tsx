"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Minimum of 6 characters" }),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [openEyeIcon, setOpenEyeIcon] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const openEye = () => {
    setOpenEyeIcon((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="flex max-h-screen items-center justify-center p-4">
      <div className="max-w-7xl w-full bg-white rounded-lg flex gap-5 overflow-hidden">
        {/* Left Image */}
        <div className="w-1/2 h-[730px] hidden md:flex items-center justify-end py-8 pl-8">
          <img
            src="../images/register.png"
            alt="Login Illustration"
            className="rounded-lg object-cover h-full w-full"
          />
        </div>
        {/* Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <div className="mx-auto mb-4 rounded-full flex items-center justify-center">
              {/* Logo/Icon */}
              <img src="../images/Logo.png" alt="logo" />
            </div>
            <h2 className="text-xl font-semibold text-black-50">
              Welcome Back to Estiper
            </h2>
            <p className="text-secondary-600 text-lg">
              Start your amazing journey
            </p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col items-center "
          >
            {/* Email */}
            <div className={`w-95 h-15 ${errors.email && "mb-3"}`}>
              <label className="block text-sm font-medium text-black-50 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs pt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="w-95 h-15">
              <label className="block text-sm font-medium text-black-50 mb-1">
                Password
              </label>
              <div
                className={`w-full h-10 flex items-center p-2 border rounded-lg ${
                  isFocus ? "ring-1 ring-primary-500" : ""
                } ${errors.password ? "border-red-500" : "border-gray-300"}`}
              >
                <input
                  type="password"
                  {...register("password")}
                  className={`w-full h-4 p-2 outline-none `}
                  placeholder="Enter your password"
                  onFocus={() => setIsFocus(true)}
                />
                <div onClick={openEye}>
                  {openEyeIcon ? (
                    <LuEye className="w-4 h-4" />
                  ) : (
                    <LuEyeClosed className="w-4 h-4" />
                  )}
                </div>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-evenly space-x-6 text-sm w-145 h-11">
              <label className="text-sm flex items-center gap-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-secondary-500 rounded-sm"
                />
                Remember me
              </label>
              <a href="#" className="text-lg text-primary-600 hover:underline">
                Forgot password
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="container bg-primary-200 text-white py-2 rounded-lg hover:bg-primary-600 transition"
            >
              Login
            </button>
          </form>

          <div className="w-95 flex items-center justify-between mt-6">
            <div className="w-[135px] h-px bg-gray-400" />
            <span className="text-sm text-gray-601">or login with</span>
            <div className="w-[135px] h-px bg-gray-400" />
          </div>

          {/* Login with Google & Apple */}
          <div className="w-95 mt-6 flex items-center justify-between">
            <button className="w-[180px] h-11 flex items-center justify-center gap-x-2 border border-secondary-500 py-2 rounded-lg hover:bg-gray-100 transition">
              <FcGoogle className="w-6 h-6 ml-2" />
              Google
            </button>
            <button className="w-[180px] h-11 flex items-center justify-center gap-x-2 border border-secondary-500 py-2 rounded-lg hover:bg-gray-100 transition">
              <FaApple className="w-6 h-6 ml-2" />
              Apple ID
            </button>
          </div>

          {/* Register link */}
          <p className="mt-4 text-center text-sm text-black-50">
            Don't have an account?{" "}
            <a href="#" className="text-lg text-primary-600 hover:underline">
              Register Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
