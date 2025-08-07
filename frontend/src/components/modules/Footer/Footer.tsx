// import React from 'react'
// import Link from 'next/link'

// import { RxLinkedinLogo } from "react-icons/rx";
// import { PiInstagramLogoFill } from "react-icons/pi";
// import { FaFacebookSquare } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <div className='w-full flex items-center justify-center'>
//       <div className='w-full max-w-7xl flex flex-col items-center justify-center font-roboto'>
//         <div>
//           <img src="../images/Logo.png" alt="logo" className='size-[84px]' />
//         </div>
//         <span className='w-full text-sm text-black-50 sm:hidden p-5 text-center'>
//           Lorem ipsum dolor sit amet consectetur. Mi nibh venenatis in suscipit turpis enim cursus vulputate amet. Lobortis mi platea aliquam senectus tempus mauris neque.
//         </span>
//         <ul className='text-lg text-black-50 font-medium flex items-center justify-center gap-4 my-5'>
//           <li>Title</li>
//           <li>Title</li>
//           <li>Title</li>
//           <li>Title</li>
//         </ul>
//         <div className='flex items-center justify-center gap-4 mb-5'>
//           <Link href='/'>
//             <FaFacebookSquare className='size-6' />
//           </Link>
//           <Link href='/'>
//             <PiInstagramLogoFill className='size-6' />
//           </Link>
//           <Link href='/'>
//             <RxLinkedinLogo className='size-6' />
//           </Link>
          
//         </div>
//         <hr className='w-full' />
//         <p className='text-sm text-neutral-700 my-5'>
//           Copyrighted © 2022 Estiper
//         </p>
//       </div>
//     </div>
//   )
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
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
          className="mb-4"
          priority
        />

        <p className="text-center text-sm text-neutral-500 sm:hidden px-4 mb-4">
          Lorem ipsum dolor sit amet consectetur. Mi nibh venenatis in suscipit turpis enim cursus vulputate amet. Lobortis mi platea aliquam senectus tempus mauris neque.
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-6 text-base text-neutral-700 font-medium my-4">
          <li><Link href="/">Title</Link></li>
          <li><Link href="/">Title</Link></li>
          <li><Link href="/">Title</Link></li>
          <li><Link href="/">Title</Link></li>
        </ul>

        <div className="flex gap-4 my-4">
          <Link href="/" aria-label="Facebook">
            <FaFacebookSquare className="w-6 h-6 text-neutral-700 hover:text-blue-600 transition" />
          </Link>
          <Link href="/" aria-label="Instagram">
            <PiInstagramLogoFill className="w-6 h-6 text-neutral-700 hover:text-pink-500 transition" />
          </Link>
          <Link href="/" aria-label="LinkedIn">
            <RxLinkedinLogo className="w-6 h-6 text-neutral-700 hover:text-blue-500 transition" />
          </Link>
        </div>

        <hr className="w-full border-neutral-200" />

        <p className="text-sm text-neutral-500 mt-4">
          © 2022 Estiper. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
