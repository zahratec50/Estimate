"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

type Activity = {
  _id: string;
  action: string;
  createdAt: string; // سازگار با بک‌اند (اگر timestamp است، تغییر دهید)
  meta?: any;
};

export default function ActivityLog() {
  const [items, setItems] = useState<Activity[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = async (p: number = 1) => {
    setLoading(true);
    setError(null); // ریست خطا قبل از درخواست جدید
    try {
      const res = await axios.get(`/api/admin/activity?page=${p}&limit=10`, {
        withCredentials: true,
      });
      const newItems = res.data.activities || res.data.items || []; // سازگاری با ساختارهای مختلف API
      if (p === 1) {
        setItems(newItems);
      } else {
        setItems((prev) => [...prev, ...newItems]);
      }
      // محاسبه hasMore: اگر totalPages از API می‌آید، از آن استفاده کنید
      setHasMore(p < (res.data.totalPages || Infinity));
    } catch (err: any) {
      console.error("Fetch activity error:", err);
      const errorMessage = err?.response?.data?.message || err.message || "Failed to load activity";
      setError(errorMessage);
      showErrorToast({
        title: "Error",
        description: errorMessage,
        actionLabel: "OK",
        onAction: () => {},
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(1);
  }, []); // فقط برای بارگذاری اولیه

  return (
    <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-3">Recent Activity</h3>
      {error && (
        <div className="text-red-500 text-sm mb-3">Error: {error}</div>
      )}
      <div className="space-y-3 max-h-64 overflow-auto">
        {loading && items.length === 0 ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-12 bg-gray-100 dark:bg-secondary-700 rounded animate-pulse"
            />
          ))
        ) : items.length === 0 ? (
          <div className="text-sm text-muted-foreground">No activities found</div>
        ) : (
          items.map((it) => (
            <div key={it._id} className="flex items-start gap-3">
              <div className="text-xs text-muted-foreground">
                {it.createdAt
                  ? new Date(it.createdAt).toLocaleString()
                  : "N/A"}
              </div>
              <div className="flex-1 text-sm">{it.action || "N/A"}</div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex justify-center">
        {hasMore && !error ? (
          <button
            className="px-3 py-2 rounded border disabled:opacity-50"
            onClick={() => {
              const nextPage = page + 1;
              fetchPage(nextPage);
              setPage(nextPage);
            }}
            disabled={loading}
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