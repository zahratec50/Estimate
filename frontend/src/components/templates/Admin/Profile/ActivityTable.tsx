"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useVirtualizer } from "@tanstack/react-virtual";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Activity {
  _id: string;
  adminName: string;
  adminRole: string;
  action: string;
  targetType: string;
  targetId?: string;
  details?: string;
  timestamp: string; // سازگار با بک‌اند (اگر createdAt است، تغییر دهید)
}

export default function ActivityTable() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    axios
      .get("/api/admin/activity?page=1&limit=50", { withCredentials: true })
      .then((res) => {
        if (mounted) {
          setActivities(res.data.activities || []);
        }
      })
      .catch((err) => {
        if (mounted) {
          const errorMessage = err?.response?.data?.message || err.message || "Failed to load activities";
          setError(errorMessage);
          console.error("Fetch activities error:", err);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const parentRef = React.useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: loading ? 10 : activities.length, // تعداد موقت برای اسکلتون‌ها
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // ارتفاع تقریبی ردیف
    overscan: 10, // افزایش برای بهبود اسکرول
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  return (
    <div
      ref={parentRef}
      className="h-96 overflow-auto border rounded-lg bg-white dark:bg-secondary-800"
    >
      {error ? (
        <div className="text-red-500 text-sm p-4">Error: {error}</div>
      ) : parentRef.current ? (
        <div style={{ height: totalSize, position: "relative" }}>
          <table className="min-w-full table-fixed">
            <thead className="bg-gray-100 dark:bg-secondary-700 sticky top-0 z-10">
              <tr>
                {["Admin", "Role", "Action", "Target", "Details", "Time"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left text-gray-700 dark:text-gray-200 text-sm font-medium"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 10 }).map((_, idx) => (
                  <tr
                    key={`skeleton-${idx}`}
                    style={{
                      height: 50,
                      width: "100%",
                    }}
                    className="border-b border-gray-200 dark:border-secondary-700"
                  >
                    {Array.from({ length: 6 }).map((__, c) => (
                      <td key={c} className="px-4 py-2">
                        <Skeleton height={20} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : virtualItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-sm text-muted-foreground">
                    No activities found
                  </td>
                </tr>
              ) : (
                virtualItems.map((virtualRow) => {
                  const row = activities[virtualRow.index];
                  return (
                    <tr
                      key={row._id}
                      style={{
                        position: "absolute",
                        top: virtualRow.start,
                        height: virtualRow.size,
                        width: "100%",
                      }}
                      className="border-b border-gray-200 dark:border-secondary-700"
                    >
                      <td className="px-4 py-2 text-sm">{row.adminName || "N/A"}</td>
                      <td className="px-4 py-2 text-sm">{row.adminRole || "N/A"}</td>
                      <td className="px-4 py-2 text-sm">{row.action || "N/A"}</td>
                      <td className="px-4 py-2 text-sm">{row.targetType || "N/A"}</td>
                      <td className="px-4 py-2 text-sm">{row.details || "N/A"}</td>
                      <td className="px-4 py-2 text-sm">
                        {row.timestamp
                          ? new Date(row.timestamp).toLocaleString()
                          : "N/A"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}