import { StatsCard } from "./StatsCard";
import { Folder, CheckCircle, DollarSign, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface StatsGridProps {
  totalProjects: number;
  completedQuizzes: number;
  estimatedCost: number;
  estimatedTime: number;
}

export const StatsGrid = ({
  totalProjects,
  completedQuizzes,
  estimatedCost,
  estimatedTime,
}: StatsGridProps) => {
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <motion.div
      className="grid grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 mb-32"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <StatsCard
        label="Total Projects"
        value={totalProjects}
        icon={<Folder className="w-6 h-6 text-blue-500" />}
        bgColor="bg-blue-100"
      />
      <StatsCard
        label="Completed Quizzes"
        value={completedQuizzes}
        icon={<CheckCircle className="w-6 h-6 text-green-500" />}
        bgColor="bg-green-100"
      />
      <StatsCard
        label="Estimated Cost"
        value={`$${estimatedCost.toLocaleString()}`}
        icon={<DollarSign className="w-6 h-6 text-yellow-500" />}
        bgColor="bg-yellow-100"
      />
      <StatsCard
        label="Estimated Time"
        value={`${estimatedTime} hrs`}
        icon={<Clock className="w-6 h-6 text-purple-500" />}
        bgColor="bg-purple-100"
      />
    </motion.div>
  );
};

