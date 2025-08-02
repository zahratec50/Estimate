"use Client"
import { useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";

export const redirectLogic = (step: number) => {
    const { isRegistered, setCurrentStep } = useAppStore();
    useEffect(() => {
    if (isRegistered) {
      window.location.href = '/mainQuiz/1';
    } else if (step >= 1 && step <= 4) {
      setCurrentStep(step);
    } else {
      window.location.href = '/firstQuiz/1';
    }
  }, [step, isRegistered, setCurrentStep]);

}