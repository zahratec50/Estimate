import { ReactNode } from "react";
import ClientShell from "@/components/modules/ClientShell/ClientShell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ClientShell>
      {children}
    </ClientShell>
  );
}
