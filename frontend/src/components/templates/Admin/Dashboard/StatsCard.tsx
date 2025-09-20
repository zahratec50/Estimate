// "use client";

// import React from "react";

// interface StatsCardProps {
//   title: string;
//   value: string;
//   icon: React.ReactNode;
//   trend: string;
// }

// const StatsCard = ({ title, value, icon, trend }: StatsCardProps) => {
//   return (
//     <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg shadow flex flex-col justify-between h-32">
//       <div className="flex items-center gap-4">
//         <div className="text-indigo-600 dark:text-indigo-400">{icon}</div>
//         <div className="flex flex-col">
//           <span className="text-gray-900 dark:text-gray-100 font-semibold">{value}</span>
//           <span className="text-sm text-muted-foreground">{title}</span>
//         </div>
//       </div>
//       <div className="text-xs text-green-500 mt-2">{trend}</div>
//     </div>
//   );
// };

// export default StatsCard;


"use client";

import React from "react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

const StatsCard = ({ title, value, icon, trend }: StatsCardProps) => {
  return (
    <div className="bg-white dark:bg-secondary-800 p-4 sm:p-6 rounded-lg shadow flex flex-col justify-between h-full sm:h-32 w-full">
      {/* ردیف بالایی: آیکون و مقدار */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <div className="text-indigo-600 dark:text-indigo-400 text-3xl sm:text-4xl flex-shrink-0">
          {icon}
        </div>
        <div className="flex flex-col truncate">
          <span className="text-gray-900 dark:text-gray-100 font-semibold text-lg sm:text-xl truncate">{value}</span>
          <span className="text-sm text-muted-foreground truncate">{title}</span>
        </div>
      </div>
      {/* روند */}
      <div className="text-xs sm:text-sm mt-2 text-green-500 truncate">{trend}</div>
    </div>
  );
};

export default StatsCard;
