'use client';

import { RiArmchairLine } from "react-icons/ri";

const features = [
  {
    icon: <RiArmchairLine className="w-10 h-10 text-primary-500 dark:text-white" />,
    title: "Lorem ipsum dolor sit",
  },
  {
    icon: <RiArmchairLine className="w-10 h-10 text-primary-500 dark:text-white" />,
    title: "Dolor sit amet",
  },
  {
    icon: <RiArmchairLine className="w-10 h-10 text-primary-500 dark:text-white" />,
    title: "Consectetur adipiscing",
  },
  {
    icon: <RiArmchairLine className="w-10 h-10 text-primary-500 dark:text-white" />,
    title: "Eiusmod tempor",
  },
];

export default function Features() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-full">
        <h2 className="text-xl md:text-4xl text-black-50 dark:text-white font-medium mb-8">
          Key Features
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-secondary-0 dark:bg-secondary-600 rounded-xl flex flex-col items-center justify-center text-center p-6 hover:shadow-md transition"
            >
              {feature.icon}
              <span className="mt-4 text-base md:text-lg text-black-100 dark:text-white font-medium">
                {feature.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
