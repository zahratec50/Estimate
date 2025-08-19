"use client";
import React from "react";
import { Plan } from "./PlanSelector";

type SubscriptionSummaryProps = {
  plan: Plan | undefined;
};

export default function SubscriptionSummary({ plan }: SubscriptionSummaryProps) {
  if (!plan) return null;
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Summary</h3>
      <p>Plan: {plan.name}</p>
      <p>Price: ${plan.price}/month</p>
      <ul className="mt-2 space-y-1">
        {plan.features.map((f) => (
          <li key={f} className="text-gray-700 text-sm">• {f}</li>
        ))}
      </ul>
    </div>
  );
}
