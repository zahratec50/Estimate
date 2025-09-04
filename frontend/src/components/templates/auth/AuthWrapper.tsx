import React from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function AuthWrapper({
  children,
  title,
  slogan,
  isLogin,
  forHome,
}: {
  children: React.ReactNode;
  title: string;
  slogan?: string;
  isLogin: boolean;
  forHome?: boolean;
}) {
  return (
    <div className="flex md:items-center justify-center md:h-full lg:h-full gap-8 pb-6 md:pt-4 md:pb-0">
      <div className="max-w-7xl w-full md:h-[660px] lg:h-[660px] bg-white dark:bg-background rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Image */}
        <div
          className={
            forHome
              ? "w-full md:w-1/2 h-48 md:h-[700px] lg:h-full flex items-center justify-center"
              : "hidden md:flex md:w-1/2 h-full"
          }
        >
          {/* تصویر موبایل فقط وقتی forHome=true */}
          {forHome && (
            <>
              {/* فقط موبایل */}
              <img
                src="/images/logo-black.png" // تصویر مخصوص موبایل
                alt="Auth illustration"
                className="object-cover rounded-2xl w-full h-48 md:hidden"
              />
              {/* فقط دسکتاپ */}
              <img
                src="/images/register.png"
                alt="Auth illustration"
                className="object-cover rounded-2xl w-full h-full max-h-48 md:max-h-full hidden md:block"
              />
            </>
          )}

          {/* حالت غیر forHome */}
          {!forHome && (
            <img
              src="/images/register.png"
              alt="Auth illustration"
              className="object-cover rounded-2xl w-full h-full max-h-48 md:max-h-full"
            />
          )}
        </div>

        {/* Form area */}
        <div
          className={
            forHome
              ? "w-full md:w-1/2 px-4 py-4 flex flex-col items-center justify-center overflow-y-auto md:ml-3 rounded-3xl h-full md:h-[700px] lg:h-full mt-4 md:mt-0 border border-gray-300"
              : "w-full md:w-1/2 h-full px-4 flex flex-col items-center justify-center overflow-y-auto"
          }
        >
          {/* Logo and Title */}
          <div className="text-center mb-6">
            <img
              src="/images/logo-black.png"
              alt="logo"
              className={forHome ? "hidden md:block" : "h-16 w-16 mx-auto mb-2 flex dark:hidden"}
            />
            <img
              src="/images/Frame 20.png"
              alt="logo"
              className={forHome ? "hidden md:block" : "h-16 w-16 mx-auto mb-2 hidden dark:flex"}
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
            <button className="flex-1 h-11 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-secondary-700 dark:border-secondary-700">
              <FcGoogle className="text-xl" /> Google
            </button>
            <button className="flex-1 h-11 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-secondary-700 dark:border-secondary-700">
              <FaApple className="text-xl" /> Apple ID
            </button>
          </div>

          {/* Redirect Link */}
          <p className="text-sm text-gray-600 mt-6">
            {isLogin ? "Don't have an account?" : "Have an account?"}{" "}
            <Link
              href={isLogin ? "/signup" : "/signin"}
              className="text-secondary-600 dark:text-secondary-300 hover:underline"
            >
              {isLogin ? "Sign up now" : "Login now"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
