"use client";

import { useState, useEffect } from "react";
import { IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { TbHelpOctagon } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

import ThemeSwitcher from "../Theme/Theme";
import { useTheme } from "next-themes";
import Link from "next/link";

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
  const { theme } = useTheme();

  const logoSrc =
    theme === "dark" ? "/images/Frame 20.png" : "/images/Logo.png";
  if (isHome) {
    return (
      <header className="flex items-center justify-between py-5 px-10 bg-white dark:bg-secondary-900 font-roboto">
        <nav className="flex items-center justify-center gap-6">
          <Image
            src={logoSrc}
            alt="logo"
            width={80}
            height={80}
            className="w-20 h-20"
          />
          <Link href="/features" className="text-black-50 dark:text-white text-2xl font-bold">
            Features
          </Link>
          <Link href="/about" className="text-black-50 dark:text-white text-2xl font-bold">
            About
          </Link>
          <Link href="/contact" className="text-black-50 dark:text-white text-2xl font-bold">
            Contact
          </Link>
        </nav>
        <div className="flex items-center justify-between gap-2">
          <ThemeSwitcher />
          <button className="bg-primary-500 text-white text-lg px-8 py-2 rounded-lg">
            Sign Up
          </button>
        </div>
      </header>
    );
  }
  return (
    <>
      {/* Topbar */}
      <header className="flex items-center justify-between px-2 py-3 sm:px-6 shadow-md dark:shadow-secondary-500 relative z-30 dark:bg-secondary-900 bg-white font-roboto">
        {/* Mobile Menu Button + Logo */}
        <div className="flex items-center justify-between gap-2 md:hidden">
          <button type="button" aria-label="Open menu" onClick={onMenuClick}>
            <svg
              className="w-6 h-6 text-black"
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
          <div className={`${isHelpOpen ? "ml-5 md:ml-64" : " ml-2"}`}>
            <ThemeSwitcher />
          </div>
        </div>
        <Image
          src={logoSrc}
          alt="logo"
          width={48}
          height={48}
          className="w-10 h-10"
        />
        {/* theme */}

        {/* Desktop-only actions */}
        <div className="flex items-center space-x-3 md:space-x-6 dark:text-white text-secondary-700 text-sm md:text-base font-medium ">
          <span className="hidden md:flex items-center cursor-pointer">
            <IoNotificationsOutline className="w-5 h-5 mr-1" />
            Notifications
          </span>
          <span className="hidden md:flex items-center cursor-pointer">
            <IoSearchOutline className="w-5 h-5 mr-1" />
            {isHelpOpen ? "" : "Search"}
          </span>
          <span
            className="flex items-center cursor-pointer"
            onClick={() => onHelpToggle(true)}
          >
            <TbHelpOctagon className="w-5 h-5 mr-1" />
            {isHelpOpen ? "" : "Help"}
          </span>
        </div>
      </header>
    </>
  );
}
