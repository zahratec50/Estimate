"use client";

import React, { memo, useState } from "react";
import StatsCard from "./StatsCard";
import ProjectsChart from "./ProjectsChart";
import RequestsTable from "./RequestsTable";
import ActivityTable from "./ActivityTable";
import DashboardTabs from "./DashboardTabs";
import { FileText, Users, DollarSign, ClipboardList } from "lucide-react";

const AdminDashboard = () => {
  const statsData = [
    { title: "Total Projects", value: "128", icon: <FileText />, trend: "+12 since last week" },
    { title: "Active Users", value: "54", icon: <Users />, trend: "+4 today" },
    { title: "Revenue", value: "$12,340", icon: <DollarSign />, trend: "+8% from last month" },
    { title: "Pending Requests", value: "7", icon: <ClipboardList />, trend: "Review now" },
  ];

  return (
    <main className="p-6 flex-1 space-y-8">
      {/* KPI Cards */}
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>

      {/* Chart + Tables Tabs */}
      <DashboardTabs
        chart={<ProjectsChart />}
        requestsTable={<RequestsTable />}
        activityTable={<ActivityTable />}
      />
    </main>
  );
};

export default memo(AdminDashboard);