import { ReactNode } from "react";
import ClientShell from "@/components/templates/Quiz/ClientShell/ClientShell";

export default function MainQuizLayout({ children }: { children: ReactNode }) {
  return (
    <ClientShell isFirstQuiz={false} >
        {children}
    </ClientShell>
  )
}