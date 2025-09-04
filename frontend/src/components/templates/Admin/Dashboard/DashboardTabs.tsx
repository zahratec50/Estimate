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
      <Tab.List className="flex space-x-4 border-gray-200 dark:border-secondary-700 ">
        {tabs.map((tab) => (
          <Tab key={tab} className={({ selected }) =>
            `px-4 py-2 rounded-t-lg ${selected ? "bg-gray-100 text-gray-800 dark:bg-secondary-800 dark:text-white" : "text-gray-500 dark:text-gray-400 hover:text-gray-700"}`
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
