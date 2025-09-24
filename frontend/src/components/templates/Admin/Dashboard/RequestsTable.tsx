"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
import { CiSearch } from "react-icons/ci";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface Request {
  id: string;
  title: string;
  user: string;
  status: string;
  createdAt: string;
}

export default function RequestsTable() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/admin/requests?page=${page}&limit=10&search=${search}`,
        { withCredentials: true }
      );
      const mapped = res.data.data.map((item: any) => ({
        id: item.id,
        title: item.name, // مپ کردن name → title
        user: item.email, // مپ کردن email → user
        status: item.status,
        createdAt: item.createdAt,
      }));
      setRequests(mapped);
      setTotalPages(Math.ceil(res.data.total / 10));
    } catch (err: any) {
      console.error(err);
      showErrorToast({
        title: "Error",
        description: err?.response?.data?.message || "Failed to load requests",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page, search]);

  return (
    <div className="bg-gray-100 dark:bg-secondary-800 p-4 rounded-lg shadow font-roboto">
      {/* Search Bar + Pagination */}
      <div className="flex justify-between items-center mb-4">
        {/* Search Input with Icon */}
        <div className="relative w-1/2">
          <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
          <Input
            placeholder="Search requests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-secondary-700 disabled:opacity-50 transition-colors"
            title="Previous page"
          >
            <IoChevronBack size={20} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const dotPage = idx + 1;
              const isActive = dotPage === page;
              return (
                <span
                  key={idx}
                  onClick={() => setPage(dotPage)}
                  className={`
                    w-2 h-2 rounded-full cursor-pointer transition-all duration-300
                    ${isActive ? "bg-gray-400 dark:bg-primary dark:bg-white scale-125 shadow-lg" : "bg-gray-300 dark:bg-gray-600 hover:scale-110"}
                  `}
                />
              );
            })}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-secondary-700 disabled:opacity-50 transition-colors"
            title="Next page"
          >
            <IoChevronForward size={20} />
          </button>
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4}>Loading...</TableCell>
            </TableRow>
          ) : requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>No requests found</TableCell>
            </TableRow>
          ) : (
            requests.map((r) => (
              <TableRow key={r.id} className="hover:bg-gray-50 dark:hover:bg-secondary-400">
                <TableCell>{r.title}</TableCell>
                <TableCell>{r.user}</TableCell>
                <TableCell
                  className={
                    r.status === "pending"
                      ? "text-yellow-500 font-semibold font-roboto"
                      : r.status === "approved"
                      ? "text-green-500 font-semibold font-roboto"
                      : "text-blue-500 font-semibold font-roboto"
                  }
                >
                  {r.status}
                </TableCell>
                <TableCell>
                  {new Date(r.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
