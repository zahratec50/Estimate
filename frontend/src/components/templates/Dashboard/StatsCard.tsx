// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// interface StatsCardProps {
//   label: string;
//   value: string | number;
// }

// export const StatsCard = ({ label, value }: StatsCardProps) => (
//   <Card className="hover:shadow-lg transition cursor-pointer">
//     <CardHeader>
//       <CardTitle>{label}</CardTitle>
//     </CardHeader>
//     <CardContent>
//       <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
//     </CardContent>
//   </Card>
// );

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  bgColor?: string;
}

export const StatsCard = ({ label, value, icon, bgColor = "bg-gray-100" }: StatsCardProps) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Card className="cursor-pointer">
      <CardHeader className="flex flex-row sm:items-center sm:justify-center gap-3">
        {icon && (
          <div className={`p-3 rounded-full ${bgColor} flex items-center justify-center`}>
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
