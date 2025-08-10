"use client";

import Image from "next/image";
import Link from "next/link";
import {
  IoNotificationsOutline,
  IoSearchOutline,
  IoClose,
} from "react-icons/io5";
import { TbHelpOctagon } from "react-icons/tb";
import clsx from "clsx";

import ThemeSwitcher from "../Theme/Theme";

interface TopbarProps {
  onMenuClick: () => void;
  onHelpToggle: (open: boolean) => void;
  isHelpOpen: boolean;
  isHome?: boolean;
}

export default function Topbar({
  onMenuClick,
  onHelpToggle,
  isHelpOpen,
  isHome = false,
}: TopbarProps) {
  return (
    <header
      className={clsx(
        "w-full relative z-30 font-roboto",
        isHome
          ? "px-2 py-2 flex justify-between items-center"
          : "px-2 py-3 sm:px-6 shadow-md flex justify-between items-center dark:bg-secondary-900 bg-white"
      )}
    >
      {/* Left Side: Menu Button + Logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open menu"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <svg
            className="w-6 h-6 text-white"
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

        <Image
          src="/images/Frame 20.png"
          alt="Estiper logo"
          width={isHome ? 80 : 48}
          height={isHome ? 80 : 48}
          className={clsx(
            "block dark:hidden",
            isHome
              ? "w-11 h-11 md:w-16 md:h-16  block dark:hidden"
              : "w-10 h-10 block sm:hidden"
          )}
        />

        <Image
          src="/images/Frame 20.png"
          alt="Estiper logo dark"
          width={isHome ? 80 : 48}
          height={isHome ? 80 : 48}
          className={clsx(
            "object-contain",
            isHome
              ? "w-11 h-11 md:w-16 md:h-16 hidden dark:block"
              : "w-10 h-10 block sm:hidden"
          )}
        />

        {isHome && (
          <nav className="hidden md:flex items-center gap-6">
            {["features", "about", "contact"].map((page) => (
              <Link
                key={page}
                href={`/${page}`}
                className="text-white text-sm font-bold"
              >
                {page[0].toUpperCase() + page.slice(1)}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Right Side: Theme + Actions */}
      <div
        className={clsx("flex items-center gap-2", {
          "ml-5 md:ml-64": !isHome && isHelpOpen,
          "ml-2": !isHome && !isHelpOpen,
        })}
      >
        <ThemeSwitcher />

        {isHome ? (
          <div className="flex items-center justify-between gap-3">
            <button className="hidden sm:flex w-20 bg-white text-primary-500 text-sm px-4 py-2 md:px-4 md:py-2 rounded-lg">
            <Link href="/signin">Login</Link>
          </button>
            <button className="w-20 bg-white text-primary-500 text-sm px-4 py-2 md:px-4 md:py-2 rounded-lg">
            <Link href="/signup">Sign Up</Link>
          </button>
          </div>
          
        ) : (
          <div className="flex items-center space-x-3 md:space-x-6 dark:text-white text-secondary-700 text-sm md:text-base font-medium">
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
          </div>
        )}
      </div>
    </header>
  );
}
