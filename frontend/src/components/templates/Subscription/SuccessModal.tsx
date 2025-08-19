"use client";
import React from "react";

type SuccessModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function SuccessModal({ open, onClose }: SuccessModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
        <p className="mb-4">Your subscription has been activated.</p>
        <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Close
        </button>
      </div>
    </div>
  );
}
