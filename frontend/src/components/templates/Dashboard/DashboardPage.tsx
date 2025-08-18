"use client";

import { useAppStore } from "@/store/useAppStore";
import { StatsGrid } from "./StatsGrid";
import { ProjectsGrid } from "./ProjectsGrid";
import { RecentActivityList } from "./RecentActivityList";

export default function DashboardPage() {
  const projects = useAppStore((state) => state.projects);

  const completedQuizzes = projects.filter((p) => p.completed).length;
  const estimatedCost = projects.reduce((sum, p) => sum + p.mainQuizAnswers.length * 1000, 0);
  const estimatedTime = projects.reduce((sum, p) => sum + p.mainQuizAnswers.length * 2, 0);

  const recentActivities = projects.map((p) => ({
    text: `Project "${p.name}" updated`,
    time: "2 hours ago", // می‌توانید زمان واقعی اضافه کنید
  }));

  return (
    <div className="px-6 py-8">
      <StatsGrid
        totalProjects={projects.length}
        completedQuizzes={completedQuizzes}
        estimatedCost={estimatedCost}
        estimatedTime={estimatedTime}
      />

      <h2 className="text-2xl font-semibold mb-4">Active Projects</h2>
      <ProjectsGrid projects={projects} />

      <h2 className="text-2xl font-semibold mt-8 mb-4">Recent Activity</h2>
      <RecentActivityList activities={recentActivities} />
    </div>
  );
}
