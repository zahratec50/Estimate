import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  bgColor?: string;
}

export const StatsCard = ({ label, value, icon, bgColor }: StatsCardProps) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Card className={`cursor-pointer dark:bg-secondary-700 border-none ${bgColor}`}>
      <CardHeader className="flex flex-row sm:items-center sm:justify-center gap-3">
        {icon && (
          <div className={`p-3 rounded-full flex items-center justify-center`}>
            {icon}
          </div>
        )}
        <CardTitle className="text-sm sm:text-base">{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
          {value}
        </p>
      </CardContent>
    </Card>
  </motion.div>
);
