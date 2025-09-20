"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";

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

const CustomTooltip = ({ active, payload, label }: any) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (active && payload && payload.length) {
    const { projects, cost } = payload[0].payload;
    return (
      <div
        className={`p-2 rounded shadow border ${
          isDark
            ? "bg-gray-800 border-gray-700 text-gray-200"
            : "bg-white border-gray-300 text-gray-800"
        }`}
      >
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-sm">Projects: {projects}</p>
        <p className="text-sm">Cost: ${cost.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const ProjectsChart = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // رنگ ستون‌ها
  const projectsColor = isDark ? "#60A5FA" : "#3B82F6";
  const costColor = isDark ? "#94A3B8" : "#48565C";

  // رنگ محور‌ها
  const xAxisColor = isDark ? "#9CA3AF" : "#6B7280";

  return (
    <div className="bg-gray-100 dark:bg-secondary-800 md:p-4 rounded-lg rounded-tl-none shadow h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            // strokeDasharray="3 3"
            vertical={false}
            horizontal={false}
            stroke={isDark ? "#374151" : "#D1D5DB"}
          />
          <XAxis dataKey="name" stroke={xAxisColor} />
          <YAxis yAxisId="left" stroke={projectsColor} />
          <YAxis yAxisId="right" orientation="right" stroke={costColor} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              fontSize: "14px",
              fontWeight: 500,
              color: isDark ? "#E5E7EB" : "#111827",
            }}
          />
          <Bar
            yAxisId="left"
            dataKey="projects"
            fill={projectsColor}
            radius={[4, 4, 0, 0]}
            name="Projects"
          />
          <Bar
            yAxisId="right"
            dataKey="cost"
            fill={costColor}
            radius={[4, 4, 0, 0]}
            name="Cost ($)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
    
  );
};

export default ProjectsChart;

