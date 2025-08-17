"use client";

import Quiz from "@/components/templates/Quiz/Quiz"
import { redirectLogic } from "@/hooks/helpers";

export default function FirstQuizPage({
  params,
}: {
  params: { step: string };
}) {
  const step = parseInt(params.step, 10);

  redirectLogic(step);

  return <Quiz isFirstQuiz={false} />;
}
