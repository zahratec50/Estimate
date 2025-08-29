"use client";

import React, { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import ProfileForm from "./ProfileForm";
import SecuritySettings from "./SecuritySettings";
import ActivityLog from "./ActivityLog";
import clsx from "clsx";

const tabs = ["Profile", "Security", "Activity"];

export default function ProfileTabs() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [forceOpenProfile, setForceOpenProfile] = useState(false);

  useEffect(() => {
    const onOpen = () => {
      setSelectedIndex(0);
      setForceOpenProfile(true);
      // reset after a tick
      setTimeout(() => setForceOpenProfile(false), 100);
    };
    window.addEventListener("open-profile-edit", onOpen as EventListener);
    return () => window.removeEventListener("open-profile-edit", onOpen as EventListener);
  }, []);

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List className="flex gap-2 border-b border-gray-100 dark:border-secondary-700 mb-4">
        {tabs.map((t, i) => (
          <Tab key={t} className={({ selected }) =>
            clsx(
              "px-4 py-2 rounded-t-lg text-sm font-medium",
              selected
                ? "bg-white dark:bg-secondary-800 text-gray-900 dark:text-white shadow"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-secondary-700"
            )
          }>
            {t}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels>
        <Tab.Panel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Profile form (editing) */}
            <div className="col-span-1">
              <ProfileForm openEditor={forceOpenProfile} />
            </div>

            {/* Right: compact stats */}
            <div className="col-span-1 space-y-4">
              {/* simple KPI cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-secondary-700 p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground">Projects</div>
                  <div className="text-xl font-semibold">128</div>
                </div>
                <div className="bg-gray-50 dark:bg-secondary-700 p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground">Users</div>
                  <div className="text-xl font-semibold">3,420</div>
                </div>
                <div className="bg-gray-50 dark:bg-secondary-700 p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground">Active</div>
                  <div className="text-xl font-semibold">54</div>
                </div>
                <div className="bg-gray-50 dark:bg-secondary-700 p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground">Requests</div>
                  <div className="text-xl font-semibold">7</div>
                </div>
              </div>

              {/* card: quick actions */}
              <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Quick Actions</div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 px-3 py-2 rounded bg-indigo-600 text-white">New Project</button>
                  <button className="px-3 py-2 rounded border">Users</button>
                </div>
              </div>
            </div>
          </div>
        </Tab.Panel>

        <Tab.Panel>
          <SecuritySettings />
        </Tab.Panel>

        <Tab.Panel>
          <ActivityLog />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
