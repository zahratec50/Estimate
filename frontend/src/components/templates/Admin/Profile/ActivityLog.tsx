"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

type Activity = {
  _id: string;
  action: string;
  createdAt: string;
  meta?: any;
};

export default function ActivityLog() {
  const [items, setItems] = useState<Activity[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPage = async (p = 1) => {
    setLoading(true);
    try {
      // فرض می‌کنیم سرور صفحه‌ای است: /api/admin/activity?page=1&limit=10
      const res = await axios.get(`/api/admin/activity?page=${p}&limit=10`, {
        withCredentials: true,
      });
      if (p === 1) setItems(res.data.items);
      else setItems((prev) => [...prev, ...res.data.items]);
      setHasMore(res.data.hasMore);
    } catch (err: any) {
      console.error("fetch activity:", err?.response?.data || err);
      showErrorToast({
        title: "Error",
        description: err?.response?.data?.message || "Failed to load activity",
        actionLabel: "OK",
        onAction: () => {},
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(1);
  }, []);

  return (
    <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-3">Recent Activity</h3>
      <div className="space-y-3 max-h-64 overflow-auto">
        {loading && items.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-12 bg-gray-100 dark:bg-secondary-700 rounded animate-pulse"
              />
            ))
          : items.map((it) => (
              <div key={it._id} className="flex items-start gap-3">
                <div className="text-xs text-muted-foreground">
                  {new Date(it.createdAt).toLocaleString()}
                </div>
                <div className="flex-1 text-sm">{it.action}</div>
              </div>
            ))}
      </div>

      <div className="mt-4 flex justify-center">
        {hasMore ? (
          <button
            className="px-3 py-2 rounded border"
            onClick={() => {
              fetchPage(page + 1);
              setPage((p) => p + 1);
            }}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        ) : (
          <div className="text-sm text-muted-foreground">
            No more activities
          </div>
        )}
      </div>
    </div>
  );
}
