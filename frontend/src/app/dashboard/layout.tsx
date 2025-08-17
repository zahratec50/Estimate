import { ReactNode } from "react";
import UserDashboard from "@/components/modules/UserDashboard/UserDashboard";

export default function DashboardLayout({children}: { children: ReactNode }) {
  return (
    <div>
      <UserDashboard isFirstQuiz={false}>
        {children}
      </UserDashboard>
    </div>
  )
}
