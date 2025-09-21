"use client";

import Image from "next/image";
import Link from "next/link";
import { IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { TbHelpOctagon } from "react-icons/tb";
import clsx from "clsx";
import React from "react";
import TopbarUserInfo from "@/components/templates/Dashboard/Profile/TopbarUserInfo";
import ThemeSwitcher from "@/components/modules/Theme/Theme";
import { useAppStore } from "@/store/useAppStore";

interface TopbarProps {
  onMenuClick: () => void;
  onHelpToggle: (open: boolean) => void;
  isHelpOpen: boolean;
  isHome?: boolean;
  isFirstQuiz?: boolean;
}

const TopbarBase = ({
  onMenuClick,
  onHelpToggle,
  isHelpOpen,
  isHome = false,
  isFirstQuiz,
}: TopbarProps) => {

  const { isRegistered } = useAppStore();
  
  return (
    <header
      className={clsx(
        "w-full relative z-30 font-roboto",
        isHome
          ? "px-2 py-2 flex justify-between items-center"
          : "px-2 sm:py-0 sm:px-0 flex justify-between items-center dark:bg-secondary-900 bg-blackNew-50 lg:bg-white border-b-2 border-neutral-300",
      )}
    >
      {/* Left: Menu + Logo */}
      <div className="w-full flex items-center gap-3 sm:pl-2">
        
          <button
            type="button"
            aria-label="Open menu"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <svg
              className="w-6 h-6 md:size-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        


        {/* Logos */}
        {isHome && (
          <Image
            src="/images/Frame 20.png"
            alt="Estiper logo"
            width={isHome ? 80 : 48}
            height={isHome ? 80 : 48}
            className={clsx(
              "block dark:hidden",
              isHome ? "w-12 h-12 md:w-16 md:h-16" : "w-12 h-12 block lg:hidden"
            )}
          />
        )}

        <Image
          src="/images/Frame 20.png"
          alt="Estiper logo dark"
          width={isHome ? 80 : 48}
          height={isHome ? 80 : 48}
          className={clsx(
            "object-contain",
            isHome
              ? "w-12 h-12 md:w-16 md:h-16 hidden dark:block"
              : "w-12 h-12 block lg:hidden"
          )}
        />

        {isHome && (
          <nav className="hidden lg:flex items-center gap-3 sm:gap-6">
            <Link
              href="#features"
              className="text-white text-xs sm:text-base font-semibold tracking-wide"
            >
              Features
            </Link>
            <Link
              href="#questions"
              className="text-white text-xs sm:text-base font-semibold tracking-wide"
            >
              Questions
            </Link>
            <Link
              href="/chat"
              className="text-white text-xs sm:text-base font-semibold tracking-wide"
            >
              contact
            </Link>
          </nav>
        )}
      </div>

      {/* Right: Actions */}
      <div
        className={clsx("w-full gap-2", {
          "ml-5 lg:ml-64 items-end": !isHome && isHelpOpen,
          "ml-0": !isHome && !isHelpOpen,
        })}
      >
        {isHome && !isRegistered ? (
          <div className="flex items-center justify-end gap-3">
            <button className="hidden sm:flex w-20 text-white hover:bg-secondary-800 text-sm px-4 py-2 md:px-4 md:py-2 rounded-lg">
              <Link href="/signin">Log in</Link>
            </button>
            <button className="w-20 bg-white hover:bg-secondary-100 text-primary-500 text-xs sm:text-sm px-4 py-2 md:px-1 md:py-2 rounded-lg">
              <Link href="/signup">Sign Up</Link>
            </button>
          </div>
        ) : (
          <>
            <div className={`w-full ${isHome && "hidden"}`}>
              <div className="w-full flex items-center justify-end space-x-3 md:space-x-6 dark:text-white text-white lg:text-secondary-700 text-sm md:text-base font-medium p-4">
                <span className="flex items-center cursor-pointer">
                  <ThemeSwitcher />
                </span>
                <span className="hidden md:flex items-center cursor-pointer">
                  <IoNotificationsOutline className="w-5 h-5 mr-1" />
                  Notifications
                </span>
                <span className="hidden md:flex items-center cursor-pointer">
                  <IoSearchOutline className="w-5 h-5 mr-1" />
                  {!isHelpOpen && "Search"}
                </span>
                <span
                  className="flex items-center cursor-pointer"
                  onClick={() => onHelpToggle(true)}
                >
                  <TbHelpOctagon className="w-5 h-5 mr-1" />
                  {!isHelpOpen && "Help"}
                </span>
                <TopbarUserInfo size="size-10" />
              </div>
            </div>

            <div
              className={`w-full flex items-center justify-end ${
                !isHome && "hidden"
              }`}
            >
              <TopbarUserInfo size='size-16' />
            </div>
          </>
        )}
      </div>
    </header>
  );
};

const Topbar = React.memo(TopbarBase);

export default Topbar;