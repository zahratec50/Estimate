import { ReactNode } from "react";
import ClientShell from "@/components/templates/Quiz/ClientShell/ClientShell";

export default function FirstQuizLayout({ children }: { children: ReactNode }) {
  return <ClientShell isFirstQuiz={true} />;
}
