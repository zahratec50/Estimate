'use client';

import Image from "next/image";
import Link from "next/link";

export default function Start() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full relative h-[209px] md:h-[566px] rounded-2xl overflow-hidden">

        {/* Background Image */}
        <Image
          src="/images/Frame 1597883540.png"
          alt="Get Started Background"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-primary-200/60" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-4xl text-center space-y-4">
            <h2 className="text-base md:text-3xl text-primary-800 font-bold">
              Get started today
            </h2>
            <p className="text-xs md:text-2xl text-neutral-700 font-roboto leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque.
            </p>
            <Link href="/firstQuiz/1">
              <button className="bg-primary-500 text-white text-xs md:text-lg font-medium rounded-lg py-2 px-5 md:h-12 md:px-10 mt-3 hover:bg-primary-600 transition">
                Call to Action
              </button>
            </Link>
          </div>
        </div>
        
      </div>
    </section>
  );
}
