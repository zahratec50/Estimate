"use client";

import { useState } from "react";
import SearchFilterBar from "./SearchBar";
import UserEditModal from "./UserEditModal";
import UserCreateForm from "./UserCreateForm";

export default function UserTable({ users }: { users: any[] }) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole =
      roleFilter === "all" || roleFilter === "" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" ||
      statusFilter === "" ||
      (statusFilter === "banned" && user.isBanned) ||
      (statusFilter === "active" && !user.isBanned);
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div>
      <UserCreateForm />
      <SearchFilterBar
        onSearch={setSearch}
        onRoleFilter={setRoleFilter}
        onStatusFilter={setStatusFilter}
      />

      <div className="overflow-x-auto mt-4 font-roboto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Role</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Last Seen</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 dark:hover:bg-secondary-400"
              >
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">{user.isBanned ? "Banned" : "Active"}</td>
                <td className="p-3">
                  {new Date(user.lastSeen).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-800"
                    onClick={() => setSelectedUser(user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <UserEditModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
