// import { StatsCard } from "./StatsCard";

// interface StatsGridProps {
//   totalProjects: number;
//   completedQuizzes: number;
//   estimatedCost: number;
//   estimatedTime: number;
// }

// export const StatsGrid = ({ totalProjects, completedQuizzes, estimatedCost, estimatedTime }: StatsGridProps) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//     <StatsCard label="Total Projects" value={totalProjects} />
//     <StatsCard label="Completed Quizzes" value={completedQuizzes} />
//     <StatsCard label="Estimated Cost" value={`$${estimatedCost}`} />
//     <StatsCard label="Estimated Time" value={`${estimatedTime} hrs`} />
//   </div>
// );

// import { StatsCard } from "./StatsCard";
// import { Folder, CheckCircle, DollarSign, Clock } from "lucide-react";

// interface StatsGridProps {
//   totalProjects: number;
//   completedQuizzes: number;
//   estimatedCost: number;
//   estimatedTime: number;
// }

// export const StatsGrid = ({
//   totalProjects,
//   completedQuizzes,
//   estimatedCost,
//   estimatedTime,
// }: StatsGridProps) => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//     <StatsCard
//       label="Total Projects"
//       value={totalProjects}
//       icon={<Folder className="w-6 h-6 text-blue-500" />}
//       bgColor="bg-blue-50"
//     />
//     <StatsCard
//       label="Completed Quizzes"
//       value={completedQuizzes}
//       icon={<CheckCircle className="w-6 h-6 text-green-500" />}
//       bgColor="bg-green-50"
//     />
//     <StatsCard
//       label="Estimated Cost"
//       value={`$${estimatedCost.toLocaleString()}`}
//       icon={<DollarSign className="w-6 h-6 text-yellow-500" />}
//       bgColor="bg-yellow-50"
//     />
//     <StatsCard
//       label="Estimated Time"
//       value={`${estimatedTime} hrs`}
//       icon={<Clock className="w-6 h-6 text-purple-500" />}
//       bgColor="bg-purple-50"
//     />
//   </div>
// );

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
      className="grid grid-cols-2 xl:grid-cols-4 gap-6 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <StatsCard
        label="Total Projects"
        value={totalProjects}
        icon={<Folder className="w-6 h-6 text-blue-500" />}
        bgColor="bg-blue-50"
      />
      <StatsCard
        label="Completed Quizzes"
        value={completedQuizzes}
        icon={<CheckCircle className="w-6 h-6 text-green-500" />}
        bgColor="bg-green-50"
      />
      <StatsCard
        label="Estimated Cost"
        value={`$${estimatedCost.toLocaleString()}`}
        icon={<DollarSign className="w-6 h-6 text-yellow-500" />}
        bgColor="bg-yellow-50"
      />
      <StatsCard
        label="Estimated Time"
        value={`${estimatedTime} hrs`}
        icon={<Clock className="w-6 h-6 text-purple-500" />}
        bgColor="bg-purple-50"
      />
    </motion.div>
  );
};

