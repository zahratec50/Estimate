"use client";

import React, { useState } from "react";
import { Tab } from "@headlessui/react";

interface Props {
  chart: React.ReactNode;
  requestsTable: React.ReactNode;
  activityTable: React.ReactNode;
}

const DashboardTabs = ({ chart, requestsTable, activityTable }: Props) => {
  const tabs = ["Projects", "Requests", "Activity"];
  const panels = [chart, requestsTable, activityTable];

  return (
    <Tab.Group>
      <Tab.List className="flex space-x-4 border-b border-gray-200 dark:border-secondary-700 mb-4">
        {tabs.map((tab) => (
          <Tab key={tab} className={({ selected }) =>
            `px-4 py-2 rounded-lg ${selected ? "bg-indigo-600 text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-700"}`
          }>
            {tab}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {panels.map((panel, idx) => (
          <Tab.Panel key={idx}>{panel}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default DashboardTabs;
