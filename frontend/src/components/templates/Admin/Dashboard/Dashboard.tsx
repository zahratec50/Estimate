"use client";

import React, { memo } from "react";
import RequestsTable from "./RequestsTable";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { StatCard } from "./StatCard";
import { FileText, Users, DollarSign, ClipboardList } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { name: "Jan", projects: 30 },
  { name: "Feb", projects: 50 },
  { name: "Mar", projects: 40 },
  { name: "Apr", projects: 70 },
  { name: "May", projects: 90 },
  { name: "Jun", projects: 60 },
  { name: "Jul", projects: 80 },
  { name: "Aug", projects: 75 },
  { name: "Sep", projects: 85 },
  { name: "Oct", projects: 95 },
  { name: "Nov", projects: 70 },
  { name: "Dec", projects: 100 },
];


function AdminDashboard() {
  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <main className="p-6 flex-1 space-y-8 dark:bg-secondary-900">
        {/* KPI Cards */}
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Projects" value="128" icon={<FileText />} trend="+12 since last week" />
          <StatCard title="Active Users" value="54" icon={<Users />} trend="+4 today" />
          <StatCard title="Revenue" value="$12,340" icon={<DollarSign />} trend="+8% from last month" />
          <StatCard title="Pending Requests" value="7" icon={<ClipboardList />} trend="Review now" />
        </div>

        {/* Chart + Recent Requests */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Chart */}
          <Card className="px-4">
            <CardHeader>
              <CardTitle>Projects Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="projects" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Requests */}
          <RequestsTable />
        </div>
      </main>
    </div>
  );
}

export default memo(AdminDashboard)