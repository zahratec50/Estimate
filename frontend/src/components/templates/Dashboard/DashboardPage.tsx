"use client";

import { useMemo } from "react";
import { useAppStore } from "@/store/useAppStore";
import { StatsGrid } from "./StatsGrid";
import { ProjectsGrid } from "./ProjectsGrid";
import { RecentActivityList } from "./RecentActivityList";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import Link from "next/link";

const COST_PER_QUESTION = 1000;
const TIME_PER_QUESTION = 2;

export default function DashboardPage() {
  const projects = useAppStore((state) => state.projects);

  // مرتب‌سازی پروژه‌ها بر اساس زمان آپدیت
  const sortedProjects = useMemo(
    () =>
      [...projects].sort(
        (a, b) =>
          new Date(b.updatedAt || "").getTime() -
          new Date(a.updatedAt || "").getTime()
      ),
    [projects]
  );

  // محاسبات آماری
  const completedQuizzes = useMemo(
    () => projects.filter((p) => p.completed).length,
    [projects]
  );

  const estimatedCost = useMemo(
    () =>
      projects.reduce(
        (sum, p) => sum + (p.mainQuizAnswers?.length || 0) * COST_PER_QUESTION,
        0
      ),
    [projects]
  );

  const estimatedTime = useMemo(
    () =>
      projects.reduce(
        (sum, p) => sum + (p.mainQuizAnswers?.length || 0) * TIME_PER_QUESTION,
        0
      ),
    [projects]
  );

  // Recent Activities
  const recentActivities = useMemo(
    () =>
      projects.map((p) => ({
        text: `Project "${p.name}" updated`,
        time: p.updatedAt
          ? formatDistanceToNow(new Date(p.updatedAt), { addSuffix: true })
          : "Recently",
      })),
    [projects]
  );

  // Framer Motion variants برای staggered animation
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="px-6 py-8 space-y-8">
      {/* Header + Quick Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto">
            <Link href="/dashboard/projectStart">+ Start New Estimate</Link>
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 w-full sm:w-auto">
            <Link href="/dashboard/history">View History</Link>
          </button>
        </div>
      </div>
      {/* Stats Grid with Stagger */}
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <StatsGrid
          totalProjects={projects.length}
          completedQuizzes={completedQuizzes}
          estimatedCost={estimatedCost}
          estimatedTime={estimatedTime}
        />
      </motion.div>

      {/* Active Projects */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Active Projects</h2>
        {sortedProjects.length === 0 ? (
          <div className="text-center text-gray-500 py-10 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
            <p>No projects yet. Start your first estimate!</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full flex items-start gap-6"
          >
            <ProjectsGrid projects={sortedProjects} />
          </motion.div>
        )}
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        {recentActivities.length === 0 ? (
          <div className="text-center text-gray-500 py-10 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500">No recent activity.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4 mt-8"
          >
            <RecentActivityList activities={recentActivities} />
          </motion.div>
        )}
      </section>
    </div>
  );
}
