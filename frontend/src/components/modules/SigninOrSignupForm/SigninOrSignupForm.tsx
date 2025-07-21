import React from "react";
import Link from "next/link";

import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

type MyComponentProps = {
  name: string;
  title: string;
  isAccount: string;
  registerOrLogin: string;
  children: React.ReactNode;
};

export default function SigninOrSignupForm({children, name, title, isAccount, registerOrLogin}: MyComponentProps) {


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
        <div className={`w-full md:w-1/2 ${name !== 'login' ? 'p-3' : 'p-8'} flex flex-col items-center justify-center`}>
          <div className="text-center mb-6">
            <div className="mx-auto mb-4 rounded-full flex items-center justify-center">
              {/* Logo/Icon */}
              <img src="../images/Logo.png" alt="logo" />
            </div>
            <h2 className="text-xl font-semibold text-black-50">
              {title}
            </h2>
            <p className="text-secondary-600 text-lg">
              Start your amazing journey
            </p>
          </div>

          {/* Login Form */}
          {children}

          <div className="w-[320px] sm:w-[390px] md:w-95 sm:h-4 flex items-center justify-between mt-6">
            <div className="w-[110px] sm:w-[120px] md:w-[135px] h-px bg-gray-400" />
            <span className="text-sm text-gray-601">or login with</span>
            <div className="w-[110px] sm:w-[120px] md:w-[135px] h-px bg-gray-400" />
          </div>

          {/* Login with Google & Apple */}
          <div className="w-[390px] sm:w-95 mt-6 flex items-center justify-center sm:justify-between gap-1">
            <button className="w-[155px] sm:w-[167px] md:w-[180px] h-11 flex items-center justify-center gap-x-2 border border-secondary-500 py-2 rounded-lg hover:bg-gray-100 transition">
              <FcGoogle className="w-6 h-6 ml-2" />
              Google
            </button>
            <button className="w-[155px] sm:w-[167px] md:w-[180px] h-11 flex items-center justify-center gap-x-2 border border-secondary-500 py-2 rounded-lg hover:bg-gray-100 transition">
              <FaApple className="w-6 h-6 ml-2" />
              Apple ID
            </button>
          </div>

          {/* Register link */}
          <p className="mt-4 text-center text-sm sm:text-xs md:text-base text-black-50">
            {isAccount}{" "}
            <Link href={registerOrLogin === 'Login' ? '/signin' : '/signup'} className="text-xs sm:text-sm md:text-lg text-primary-600 hover:underline">
              {registerOrLogin}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
