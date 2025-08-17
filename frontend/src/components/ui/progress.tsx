"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import clsx from "clsx";
import { useAppStore } from "@/store/useAppStore";
import firstQuestion from "@/data/firstQuestion.json";
import mainQuizData from "@/data/mainQuizData.json";

// ✅ Progress Component
function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  const safeValue = Math.max(0, Math.min(value || 0, 100));

  return (
    <ProgressPrimitive.Root
      className={clsx(
        "bg-gray-200 dark:bg-gray-700 h-4 w-full rounded-full overflow-hidden relative",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500 h-full origin-left transition-transform duration-500 ease-out will-change-transform"
        style={{
          transform: `scaleX(${Math.max(safeValue / 100, 0.001)})`
          
        }}
      />
      {safeValue > 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white dark:text-gray-100 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] pointer-events-none">
          {Math.round(safeValue)}%
        </div>
      )}
    </ProgressPrimitive.Root>
  );
}

interface ProgressSegmentProps {
  isHelpOpen: boolean;
  isFirstQuiz: boolean;
}

const ProgressSegment = React.memo(
  ({ isHelpOpen, isFirstQuiz }: ProgressSegmentProps) => {
    const currentStep = useAppStore((state) =>
      isFirstQuiz ? state.currentStepFirstQuiz : state.currentStepMainQuiz
    );
    const totalSteps = isFirstQuiz ? firstQuestion.length : mainQuizData.length;

    // ✅ جلوگیری از تقسیم بر صفر
    const safeCurrentStep = Math.max(1, Math.min(currentStep || 1, totalSteps));
    const progressValue =
      totalSteps > 1 ? ((safeCurrentStep - 1) / (totalSteps - 1)) * 100 : 100;

    const [debouncedProgress, setDebouncedProgress] =
      React.useState(progressValue);

    // ✅ Debounce بهتر
    React.useEffect(() => {
      const animationFrame = requestAnimationFrame(() => {
        setDebouncedProgress(progressValue);
      });
      return () => cancelAnimationFrame(animationFrame);
    }, [progressValue]);

    return (
      <div
        className={clsx(
          "w-full max-w-[400px] mx-auto py-4 rounded-lg bg-white dark:bg-secondary-900 transition-all duration-500 ease-in-out",
          isHelpOpen && "lg:mr-40 2xl:mr-64"
        )}
      >
        <div className="relative">
          <Progress value={debouncedProgress} />
        </div>
      </div>
    );
  }
);

ProgressSegment.displayName = "ProgressSegment";

export default ProgressSegment;
