"use client";
import React, { useState } from "react";
import PlanCard from "./PlanCard";

export type Plan = {
  id: string;
  name: string;
  price: number;
  features: string[];
};

type PlanSelectorProps = {
  plans: Plan[];
  selectedPlan: string | null;
  onSelectPlan: (id: string) => void;
};

export default function PlanSelector({ plans, selectedPlan, onSelectPlan }: PlanSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          {...plan}
          selected={selectedPlan === plan.id}
          onSelect={onSelectPlan}
        />
      ))}
    </div>
  );
}
