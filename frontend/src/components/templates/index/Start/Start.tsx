"use client";

import Image from "next/image";
import StartFirsQuizButton from "../StartFirsQuizButton";

export default function Start() {
  return (
    <section className="w-full h-[209px] md:h-[566px] flex items-center justify-center">
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
        <div className="absolute inset-0 bg-[#94A3B899]/60" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="max-w-4xl text-center space-y-4">
            <h2 className="text-base md:text-3xl text-primary-800 font-bold">
              Get started today
            </h2>
            <p className="text-xs md:text-2xl text-neutral-700 font-roboto leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae
              congue mauris rhoncus aenean vel elit scelerisque.
            </p>
            
            <StartFirsQuizButton title="Call to Action" />
          </div>
        </div>
      </div>
    </section>
  );
}
