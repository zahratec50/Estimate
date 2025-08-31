"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CategoryList from "./CategoryList";

const targetUsers = ["homeowner", "contractor", "architect", "other"];

export default function TargetUserList() {
  const [selectedTargetUser, setSelectedTargetUser] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {targetUsers.map((user) => (
          <Card
            key={user}
            className={`cursor-pointer transition-all duration-300 text-center ${
              selectedTargetUser === user
                ? "border-primary-500 shadow-lg"
                : "hover:border-primary-500 hover:shadow-md text-gray-500"
            }`}
            onClick={() => setSelectedTargetUser(user === selectedTargetUser ? null : user)}
          >
            <CardHeader>
              <CardTitle className="text-lg font-roboto capitalize">
                {user.replace("_", " ")}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <hr />
      {selectedTargetUser && (
        <CategoryList targetUser={selectedTargetUser} />
      )}
    </div>
  );
}