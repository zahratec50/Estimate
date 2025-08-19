"use client";
import React, { useState } from "react";

type PaymentFormProps = {
  onSuccess: () => void;
};

export default function PaymentForm({ onSuccess }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.length < 16 || cvv.length < 3 || expiry.length < 5) {
      setError("Invalid card information");
      return;
    }
    setError("");
    // در اینجا می‌توان API پرداخت را صدا زد
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        className="w-full px-4 py-2 border rounded-md"
      />
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="MM/YY"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="w-1/2 px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="w-1/2 px-4 py-2 border rounded-md"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button className="w-full py-2 bg-blue-600 text-white rounded-md">Pay Now</button>
    </form>
  );
}
