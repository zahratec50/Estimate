import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ActivityItemProps {
  text: string;
  time: string;
}

export const RecentActivityItem = ({ text, time }: ActivityItemProps) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Card className="p-4 cursor-pointer bg-secondary-50 dark:bg-secondary-800 dark:border-none">
      <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-0">
        <span className="text-sm sm:text-base truncate sm:truncate-none">{text}</span>
        <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">{time}</span>
      </CardContent>
    </Card>
  </motion.div>
);
