import { StatsCard } from "./StatsCard";

interface StatsGridProps {
  totalProjects: number;
  completedQuizzes: number;
  estimatedCost: number;
  estimatedTime: number;
}

export const StatsGrid = ({ totalProjects, completedQuizzes, estimatedCost, estimatedTime }: StatsGridProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatsCard label="Total Projects" value={totalProjects} />
    <StatsCard label="Completed Quizzes" value={completedQuizzes} />
    <StatsCard label="Estimated Cost" value={`$${estimatedCost}`} />
    <StatsCard label="Estimated Time" value={`${estimatedTime} hrs`} />
  </div>
);
