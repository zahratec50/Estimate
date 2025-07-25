import React from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function AuthWrapper({
  children,
  title,
  slogan,
  isLogin,
}: {
  children: React.ReactNode;
  title: string;
  slogan?: string;
  isLogin: boolean;
}) {
  return (
    <div className=" h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-6xl w-full h-full bg-white rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Image */}
        <div className="hidden md:block md:w-1/2 h-full rounded-lg">
          <img
            src="/images/register.png"
            alt="Auth illustration"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Form area */}
        <div className="w-full md:w-1/2 px-4 flex flex-col items-center justify-center overflow-y-auto">
          {/* Logo and Title */}
          <div className="text-center mb-6">
            <img
              src="/images/Logo.png"
              alt="logo"
              className="h-16 w-16 mx-auto mb-2"
            />
            <h2 className="text-xl font-bold">{title}</h2>
            {slogan && <p className="text-gray-500">{slogan}</p>}
          </div>

          {children}

          {/* Divider */}
          <div className="flex items-center w-full max-w-sm my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-2 text-sm text-gray-500">or login with</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Social login */}
          <div className="flex gap-4 w-full max-w-sm">
            <button className="flex-1 h-11 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
              <FcGoogle className="text-xl" /> Google
            </button>
            <button className="flex-1 h-11 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
              <FaApple className="text-xl" /> Apple ID
            </button>
          </div>

          {/* Redirect Link */}
          <p className="text-sm text-gray-600 mt-6">
            {isLogin ? "Don't have an account?" : "Have an account?"}{" "}
            <Link
              href={isLogin ? "/signup" : "/signin"}
              className="text-primary-600 hover:underline"
            >
              {isLogin ? "Sign up now" : "Login now"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
