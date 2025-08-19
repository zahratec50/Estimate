"use client";
import React, { useState } from "react";
import { useAppStore, PlanId } from "@/store/useAppStore";
import PlanSelector, { Plan } from "./PlanSelector";
import SubscriptionSummary from "./SubscriptionSummary";
import PaymentForm from "./PaymentForm";
import SuccessModal from "./SuccessModal";
import Link from "next/link";

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 10,
    features: ["1 project", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 25,
    features: ["5 projects", "Priority support", "Analytics"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 50,
    features: ["Unlimited projects", "Dedicated support", "Advanced analytics"],
  },
];

export default function Subscription() {
  const subscribedPlan = useAppStore((state) => state.subscribedPlan);
  const subscribePlan = useAppStore((state) => state.subscribePlan);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(
    subscribedPlan
  );
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentSuccess = () => {
    const validPlans: PlanId[] = ["basic", "pro", "enterprise"];
    if (selectedPlan && validPlans.includes(selectedPlan as PlanId)) {
      subscribePlan(selectedPlan as PlanId);
      setPaymentSuccess(true);
    }
  };

  return (
    <div className="px-4 sm:px-6 py-8 max-w-5xl mx-auto space-y-8 text-center">
      <h1 className="text-3xl font-bold mb-20">Upgrade your plan</h1>

      <PlanSelector
        plans={PLANS}
        selectedPlan={selectedPlan}
        onSelectPlan={setSelectedPlan}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SubscriptionSummary plan={PLANS.find((p) => p.id === selectedPlan)} />
        {selectedPlan && <PaymentForm onSuccess={handlePaymentSuccess} />}
      </div>

      <SuccessModal
        open={paymentSuccess}
        onClose={() => setPaymentSuccess(false)}
      />
      <button className="bg-primary-500 text-lg text-white font-roboto rounded-lg px-6 py-2">
        <Link href='/dashboard'>Cancel</Link>
      </button>
    </div>
  );
}
