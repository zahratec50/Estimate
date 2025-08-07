"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxLinkedinLogo } from "react-icons/rx";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaFacebookSquare } from "react-icons/fa";


export default function Footer() {
  
  return (
    <footer className="w-full flex justify-center bg-white dark:bg-secondary-900">
      <div className="w-full flex flex-col items-center font-roboto ">
        <Image
          src="/images/Logo.png"
          alt="Estiper logo"
          width={84}
          height={84}
          className="mb-4 block dark:hidden"
        />
        <Image
          src="/images/Frame 20.png"
          alt="Estiper logo dark"
          width={84}
          height={84}
          className="mb-4 hidden dark:block"
        />

        <p className="text-center text-sm text-neutral-500 dark:text-white sm:hidden px-4 mb-4">
          Lorem ipsum dolor sit amet consectetur. Mi nibh venenatis in suscipit
          turpis enim cursus vulputate amet. Lobortis mi platea aliquam senectus
          tempus mauris neque.
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-6 text-base text-neutral-700 dark:text-white font-medium my-4">
          <li>
            <Link href="/">Title</Link>
          </li>
          <li>
            <Link href="/">Title</Link>
          </li>
          <li>
            <Link href="/">Title</Link>
          </li>
          <li>
            <Link href="/">Title</Link>
          </li>
        </ul>

        <div className="flex gap-4 my-4 dark:text-white">
          <Link href="/" aria-label="Facebook">
            <FaFacebookSquare className="w-6 h-6 text-neutral-700 dark:text-white hover:text-blue-600 transition" />
          </Link>
          <Link href="/" aria-label="Instagram">
            <PiInstagramLogoFill className="w-6 h-6 text-neutral-700 dark:text-white hover:text-blue-600 transition" />
          </Link>
          <Link href="/" aria-label="LinkedIn">
            <RxLinkedinLogo className="w-6 h-6 text-neutral-700 dark:text-white hover:text-blue-600 transition" />
          </Link>
        </div>

        <hr className="w-full border-neutral-200" />

        <p className="text-sm text-neutral-500 dark:text-white mt-4">
          © 2022 Estiper. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
