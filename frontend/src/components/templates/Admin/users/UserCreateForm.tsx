"use client";

import { useState } from "react";
import { useCreateUser } from "@/hooks/useUsers";
import { showSuccessToast } from "@/components/modules/toasts/SuccessToast";
import { showErrorToast } from "@/components/modules/toasts/ErrorToast";
import CustomSelect from "../../../modules/CustomSelect/CustomSelect";
import { Button } from "@/components/ui/button";

export default function UserCreateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const createUser = useCreateUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser.mutateAsync({ name, email, password, role });
      showSuccessToast({
        title: "User Created",
        description: "New user has been successfully added.",
      });
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
    } catch (error) {
      showErrorToast({
        title: "Error",
        description: "Failed to create user.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-10 bg-gray-200 dark:bg-background p-4 rounded border-b font-roboto"
    >
      <h2 className="text-xl font-bold mb-4">Add New User</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 rounded px-3 py-2 w-full h-12 dark:bg-secondary-800"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded px-3 py-2 w-full h-12 dark:bg-secondary-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded px-3 py-2 w-full h-12 dark:bg-secondary-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <CustomSelect
          options={["user", "admin", "Advisor"]}
          value={role}
          onChange={setRole}
          name=""
        />
      </div>
      <div className="my-6">
        <Button
          type="submit"
          variant="default"
          className="bg-indigo-600 hover:bg-indigo-500 text-white"
        >
          Create User
        </Button>
      </div>
    </form>
  );
}
