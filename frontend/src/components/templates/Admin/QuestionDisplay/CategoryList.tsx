"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuestionList from "./QuestionList";

const categories = ["bathroom", "kitchen", "living_room", "bedroom", "other"];

interface CategoryListProps {
  targetUser: string;
}

export default function CategoryList({ targetUser }: CategoryListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white font-roboto">
        Categories for <strong>{targetUser.replace("_", " ")}</strong> 
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card
            key={category}
            className={`cursor-pointer transition-all duration-300 text-center ${
              selectedCategory === category
                ? "border-blue-500 text-blue-500 dark:border-2 shadow-lg"
                : "hover:border-primary-500 hover:shadow-md"
            }`}
            onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
          >
            <CardHeader>
              <CardTitle className="text-lg font-roboto capitalize">
                {category.replace("_", " ")}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <hr />
      {selectedCategory && (
        <QuestionList targetUser={targetUser} category={selectedCategory} />
      )}
    </div>
  );
}