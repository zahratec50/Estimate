import { ReactNode } from "react";
import ClientShell from "@/components/templates/Quiz/ClientShell/ClientShell";

export default function DashboardLayout({children}: { children: ReactNode }) {
  return (
    <div>
      <ClientShell isFirstQuiz={false} isTopbarMainQuiz={false}>
        {children}
      </ClientShell>
    </div>
  )
}