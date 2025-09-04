"use client";
import React from "react";
import clsx from "clsx";

type PlanCardProps = {
  id: string;
  name: string;
  price: number;
  features: string[];
  selected: boolean;
  onSelect: (id: string) => void;
};

export default function PlanCard({
  id,
  name,
  price,
  features,
  selected,
  onSelect,
}: PlanCardProps) {
  return (
    <div
      className={clsx(
        "min-h-[500px] border rounded-lg p-6 cursor-pointer transition-shadow flex flex-col justify-between",
        selected
          ? "border-blue-600 shadow-lg"
          : "border-gray-300 hover:shadow-md"
      )}
      onClick={() => onSelect(id)}
    >
      <div>
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-4xl text-primary-500 dark:text-white font-roboto font-medium mb-4">
          ${price}
          <span className="text-lg text-gray-700 dark:text-secondary-100">/month</span>
          
          </p>
        <ul className="mb-4 space-y-1 text-left ml-16">
          {features.map((f) => (
            <li key={f} className="text-gray-600 dark:text-secondary-50 text-sm">
              • {f}
            </li>
          ))}
        </ul>
      </div>

      <button
        className={clsx(
          "w-full py-2 rounded-md text-white font-medium",
          selected ? "bg-blue-600" : "bg-primary-500 hover:bg-gray-900 dark:bg-indigo-600 dark:hover:bg-indigo-700"
        )}
      >
        {selected ? "Selected" : "Select"}
      </button>
    </div>
  );
}
