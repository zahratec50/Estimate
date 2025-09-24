"use client";

import { useState } from "react";
import CustomSelect from "../../../modules/CustomSelect/CustomSelect";
import { CiSearch } from "react-icons/ci";

type SearchFilterBarProps = {
  onSearch: (value: string) => void;
  onRoleFilter: (role: string) => void;
  onStatusFilter: (status: string) => void;
};

export default function SearchFilterBar({
  onSearch,
  onRoleFilter,
  onStatusFilter,
}: SearchFilterBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleRoleChange = (value: string) => {
    setRole(value);
    onRoleFilter(value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onStatusFilter(value);
  };

  return (
    <div className="flex flex-col md:flex-row items-end gap-4 mb-6">
      <div className="w-full md:1/3 h-12 flex items-center gap-2 border bg-gray-100 border-gray-300 focus-within:border-2 focus-within:border-black dark:bg-secondary-800 rounded-md px-2">
        <CiSearch className="size-5" />
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full h-full outline-0 bg-gray-100 dark:bg-secondary-800"
        />
      </div>
      {/* Search Input */}

      <div className="w-full md:w-2/3 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-5">
        <CustomSelect
          options={["all", "user", "admin", "Advisor"]}
          value={role}
          onChange={handleRoleChange}
          name=""
        />

        {/* Status Filter */}
        <CustomSelect
          options={["all", "active", "banned"]}
          value={status}
          onChange={handleStatusChange}
          name=""
        />
      </div>
      {/* Role Filter */}
    </div>
  );
}
