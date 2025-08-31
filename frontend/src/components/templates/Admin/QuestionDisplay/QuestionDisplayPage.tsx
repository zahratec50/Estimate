"use client";

import React from "react";
import TargetUserList from "./TargetUserList";

export default function QuestionDisplayPage() {
  return (
    <div className='max-w-6xl mx-auto p-6'>
      <h1 className="text-xl md:text-3xl font-semibold mb-6 text-gray-900 dark:text-white font-roboto">
        Questions by Target User
      </h1>
      <TargetUserList />
    </div>
  );
}