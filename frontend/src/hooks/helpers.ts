"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

export const redirectLogic = (step: number) => {
  const router = useRouter();
  const {
    isRegistered,
    setCurrentStepFirstQuiz,
    setCurrentStepMainQuiz,
  } = useAppStore();

  useEffect(() => {
    if (isRegistered) {
      setCurrentStepMainQuiz(step);
      router.push("/mainQuiz/1");
    } else if (step >= 1 && step <= 4) {
      setCurrentStepFirstQuiz(step);
    } else {
      router.push("/firstQuiz/1");
    }
  }, [step, isRegistered, setCurrentStepFirstQuiz, setCurrentStepMainQuiz, router]);
};
