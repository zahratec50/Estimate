"use client";

import React from "react";
import ProgressSegment from "@/components/ui/progress";
import ThemeSwitch from "../Theme/Theme"
import DigitalCountdown from "@/components/templates/DigitalCountdown/DigitalCountdown";

type TopbarActionsProps = {
  isFirstQuiz: boolean;
  isHelpOpen: boolean;
};

function TopbarActions({ isFirstQuiz, isHelpOpen }: TopbarActionsProps) {
  return (
    <div className="flex items-center gap-5 px-5 border-b border-neutral-300">
      <ThemeSwitch />
      <DigitalCountdown />
      <div className="w-95">
        <ProgressSegment isFirstQuiz={isFirstQuiz} isHelpOpen={isHelpOpen} />
      </div>
    </div>
  );
}

export default React.memo(TopbarActions);