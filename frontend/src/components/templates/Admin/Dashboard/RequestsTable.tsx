"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";

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
      const res = await axios.get(`/api/admin/requests?page=${page}&limit=10&search=${search}`, { withCredentials: true });
      setRequests(res.data.requests);
      setTotalPages(res.data.totalPages);
    } catch (err: any) {
      console.error(err);
      showErrorToast({ title: "Error", description: err?.response?.data?.message || "Failed to load requests" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page, search]);

  return (
    <div className="bg-white dark:bg-secondary-800 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search requests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2"
        />
        <div>
          <Button variant="outline" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>Prev</Button>
          <span className="mx-2">{page}/{totalPages}</span>
          <Button variant="outline" onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>Next</Button>
        </div>
      </div>

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
            <TableRow><TableCell colSpan={4}>Loading...</TableCell></TableRow>
          ) : requests.length === 0 ? (
            <TableRow><TableCell colSpan={4}>No requests found</TableCell></TableRow>
          ) : requests.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.title}</TableCell>
              <TableCell>{r.user}</TableCell>
              <TableCell>{r.status}</TableCell>
              <TableCell>{new Date(r.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
