"use client";

import { motion } from "framer-motion";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: string;
}

const StatsCard = ({ label, value, icon }: StatsCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-5 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-secondary-700 dark:to-secondary-600 rounded-xl flex flex-col items-center shadow-md"
  >
    <span className="text-3xl">{icon}</span>
    <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-2">
      {label}
    </p>
    <p className="text-3xl font-bold text-primary-500">{value}</p>
  </motion.div>
);

export default StatsCard;
