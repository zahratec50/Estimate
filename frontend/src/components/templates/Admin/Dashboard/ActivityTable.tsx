"use client";

import React, { useState, useCallback } from "react";
import {
  useInfiniteQuery,
  QueryFunctionContext,
  InfiniteData,
} from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "@/components/ui/skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { debounce } from "lodash";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";

// ----------------- TYPES -----------------
interface Activity {
  id: string;
  adminName: string;
  action: string;
  targetType: string;
  targetId: string;
  createdAt: string;
}

interface ActivityPage {
  activities: Activity[];
  nextPage?: number;
}

// ----------------- MOCK DATA -----------------
const mockData: ActivityPage = {
  activities: [
    {
      id: "1",
      adminName: "Alice",
      action: "Login",
      targetType: "User",
      targetId: "123",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      adminName: "Bob",
      action: "Update",
      targetType: "Project",
      targetId: "456",
      createdAt: new Date().toISOString(),
    },
  ],
  nextPage: 2,
};

// ----------------- FETCH FUNCTION -----------------
const fetchActivities = async ({
  pageParam = 1,
  queryKey,
}: QueryFunctionContext<
  ["activities", string],
  number
>): Promise<ActivityPage> => {
  const [_key, search] = queryKey;

  if (search === "mock") {
    return mockData;
  }

  try {
    const res = await axios.get(`/api/admin/activity`, {
      params: { page: pageParam, limit: 10, search },
      withCredentials: true,
    });
    return {
      activities: res.data.activities || [],
      nextPage:
        pageParam < (res.data.totalPages || 0) ? pageParam + 1 : undefined,
    };
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw new Error("Failed to fetch activities");
  }
};

// ----------------- COMPONENT -----------------
export default function ActivityTable() {
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useCallback(
    debounce((val: string) => setSearch(val), 500),
    []
  );

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery<
      ActivityPage,
      Error,
      InfiniteData<ActivityPage>,
      ["activities", string],
      number
    >({
      queryKey: ["activities", search],
      queryFn: fetchActivities,
      getNextPageParam: (lastPage: ActivityPage) => lastPage.nextPage,
      initialPageParam: 1, // اضافه کردن مقدار اولیه pageParam
      initialData: {
        pages: [mockData],
        pageParams: [1],
      },
      placeholderData: (previousData) => previousData, // حفظ داده‌های قبلی
      staleTime: 5 * 60 * 1000, // داده‌ها تا 5 دقیقه تازه می‌مانند
    });

  // تمام فعالیت‌ها در یک آرایه
  const activities = data?.pages.flatMap((page) => page.activities || []) || [];

  return (
    <div className="bg-gray-100 dark:bg-secondary-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Admin Activity
        </h3>
        <div className="relative w-64">
          {/* آیکون */}
          <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />

          {/* اینپوت */}
          <Input
            placeholder="Search..."
            value={search} // مقدار state مربوط به input
            onChange={(e) => {
              setSearch(e.target.value);
              debouncedSearch(e.target.value); // debounce برای query
            }}
            className="pl-10 w-full" // padding-left برای فاصله از آیکون
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={activities.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={
          <div className="mt-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-10 w-full rounded-md mb-1" />
            ))}
          </div>
        }
        scrollableTarget="scrollableDiv"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Admin</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target Type</TableHead>
              <TableHead>Target ID</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.length === 0 && !isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No activities found
                </TableCell>
              </TableRow>
            ) : (
              activities.map((a: Activity) => (
                <TableRow key={a.id || Math.random().toString()}>
                  <TableCell>{a.adminName || "N/A"}</TableCell>
                  <TableCell>{a.action || "N/A"}</TableCell>
                  <TableCell>{a.targetType || "N/A"}</TableCell>
                  <TableCell>{a.targetId || "N/A"}</TableCell>
                  <TableCell>
                    {a.createdAt
                      ? new Date(a.createdAt).toLocaleString()
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </div>
  );
}
