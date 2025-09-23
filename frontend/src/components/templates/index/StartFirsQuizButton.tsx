"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

export default function StartFirsQuizButton({title}: {title?: string}) {
  const { isFirstQuizComplete, role } = useAppStore();
  const router = useRouter();

  const startQuiz = () => {
    if (isFirstQuizComplete && role === "user") {
      router.push("/dashboard/profile");
    } else if (role === "admin") {
      router.push("/admin/firstQuizManager");
    } else {
      router.push("/firstQuiz/1");
    }
  };
  return (
    <>
      <button
        onClick={startQuiz}
        className={`bg-primary-500 dark:bg-secondary-600 hover:bg-primary-200 hover:dark:bg-secondary-500 text-white ${!title ? "w-full sm:w-36 py-3 rounded-md" : "text-xs md:text-lg font-medium rounded-lg py-2 px-5 md:h-12 md:px-10 mt-3 transition"}`}
      >
        {title ? title : 'Get Started'}
      </button>
    </>
  );
}
