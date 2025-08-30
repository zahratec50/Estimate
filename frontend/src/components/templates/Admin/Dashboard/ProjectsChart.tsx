// "use client";

// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "Jan", projects: 30 },
//   { name: "Feb", projects: 50 },
//   { name: "Mar", projects: 40 },
//   { name: "Apr", projects: 70 },
//   { name: "May", projects: 90 },
//   { name: "Jun", projects: 60 },
// ];

// const ProjectsChart = () => {
//   return (
//     <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow h-[300px]">
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
//           <XAxis dataKey="name" stroke="#6B7280" />
//           <YAxis stroke="#6B7280" />
//           <Tooltip />
//           <Bar dataKey="projects" fill="#3b82f6" radius={[4,4,0,0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ProjectsChart;

"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// داده ۱۲ ماهه
const data = [
  { name: "Jan", projects: 30, cost: 1200 },
  { name: "Feb", projects: 50, cost: 2300 },
  { name: "Mar", projects: 40, cost: 1800 },
  { name: "Apr", projects: 70, cost: 3200 },
  { name: "May", projects: 90, cost: 4500 },
  { name: "Jun", projects: 60, cost: 2800 },
  { name: "Jul", projects: 80, cost: 3700 },
  { name: "Aug", projects: 55, cost: 2500 },
  { name: "Sep", projects: 65, cost: 3100 },
  { name: "Oct", projects: 75, cost: 3900 },
  { name: "Nov", projects: 85, cost: 4200 },
  { name: "Dec", projects: 95, cost: 5000 },
];

// تولتیپ سفارشی
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { projects, cost } = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded shadow">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-sm">Projects: {projects}</p>
        <p className="text-sm">Cost: ${cost.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const ProjectsChart = () => {
  return (
    <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="projects" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectsChart;
