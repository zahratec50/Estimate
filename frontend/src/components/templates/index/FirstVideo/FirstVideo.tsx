'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FirstVideo() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full flex flex-col md:flex-row items-center gap-6 font-roboto">
        
        {/* Left Image or Placeholder */}
        <div className="w-full md:w-1/2 rounded-2xl bg-primary-200 aspect-[4/3] md:aspect-[16/9] relative overflow-hidden">
          <span className="absolute inset-0 flex items-center justify-center text-black-50 text-xl">video</span>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-black-50">
          <h2 className="text-xl md:text-4xl font-medium mb-4">Title</h2>
          <p className="text-base md:text-lg font-normal leading-relaxed mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Egestas purus viverra accumsan in nisl nisi. Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque. In egestas erat imperdiet sed euismod nisi porta lorem mollis.
          </p>
          <button className="self-start bg-primary-500 text-white text-base md:text-lg font-medium rounded-lg w-full md:w-32 h-12 transition hover:bg-primary-600">
            <Link href='/firstQuiz/1'>Get Started</Link>
          </button>
        </div>

      </div>
    </section>
  );
}
