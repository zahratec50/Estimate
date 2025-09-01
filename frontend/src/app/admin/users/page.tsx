"use client";

import {useUsers} from "@/hooks/useUsers";
import UserTable from "@/components/templates/Admin/users/UserTable";

export default function AdminUsersPage() {
  const { data: users, isLoading } = useUsers();

  if (isLoading) return <p>Loading users...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <UserTable users={users || []} />
    </div>
  );
}
