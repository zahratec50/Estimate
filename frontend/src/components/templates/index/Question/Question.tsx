"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { MdChair } from "react-icons/md";
import { PiLampFill } from "react-icons/pi";
import { FaBath } from "react-icons/fa6";
import { FaSink } from "react-icons/fa";

import StartFirsQuizButton from "../StartFirsQuizButton";

type QuestionProps = {
  question: string;
  answer: string;
  id: number;
  image: string;
  features?: string[];
};

export default function Question({
  question,
  answer,
  id,
  image,
  features,
}: QuestionProps) {
  const icons = [MdChair, PiLampFill, FaBath, FaSink];

  return (
    <div className="w-full h-[600px] sm:h-[1000px] lg:h-[558px]">
      <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center px-5 xl:px-0">
        <div
          className={`w-full h-52 sm:h-85 lg:w-1/2 lg:h-full rounded-2xl mb-10 lg:mb-0 ${
            id % 2 === 0 ? "order-2 lg:order-1" : "order-1 lg:order-2"
          }`}
        >
          <Image
            src={image}
            alt={question}
            width={500}
            height={300}
            className="w-full h-52 sm:h-[500px] xl:h-full object-cover rounded-2xl"
          />
        </div>

        <div
          className={`w-full h-[352px] sm:h-full lg:w-1/2 flex items-center ${
            id % 2 === 0
              ? "order-2 justify-start lg:justify-end"
              : "order-1 justify-start"
          }`}
        >
          <div className="w-[440px] flex flex-col gap-5 lg:gap-9">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-semibold">
              {question}
            </h2>
            <span className="text-base sm:text-lg">{answer}</span>
            {features && features.length > 0 && (
              <ul className="list-disc space-y-3">
                {features.map((feature, index) => {
                  const Icon = icons[index % icons.length]; // انتخاب آیکون بر اساس ایندکس
                  return (
                    <li
                      key={index}
                      className="flex items-center gap-2 mb-1 leading-tight "
                    >
                      <div className="size-4 lg:size-5">
                        <Icon className="text-primary-500 dark:text-primary-100 text-lg" />
                      </div>
                      {feature}
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <StartFirsQuizButton />
              <span className="hidden sm:flex w-fit border-b border-newGray-white hover:border-primary-200 transition-all duration-200">
                <Link href="/signin">Already have an account? Sign in</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
