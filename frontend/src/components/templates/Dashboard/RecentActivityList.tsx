// import { RecentActivityItem } from "./RecentActivityItem";

// interface RecentActivityListProps {
//   activities: { text: string; time: string }[];
// }

// export const RecentActivityList = ({ activities }: RecentActivityListProps) => (
//   <div className="space-y-4 mt-8">
//     {activities.map((act, idx) => (
//       <RecentActivityItem key={idx} text={act.text} time={act.time} />
//     ))}
//   </div>
// );

import { RecentActivityItem } from "./RecentActivityItem";
import { motion } from "framer-motion";

interface RecentActivityListProps {
  activities: { text: string; time: string }[];
}

export const RecentActivityList = ({ activities }: RecentActivityListProps) => {
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <motion.div
      className="space-y-4 mt-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {activities.map((act, idx) => (
        <RecentActivityItem key={idx} text={act.text} time={act.time} />
      ))}
    </motion.div>
  );
};
