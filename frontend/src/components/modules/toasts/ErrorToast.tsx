"use client";

// import { XCircle } from "lucide-react"; // یا هر آیکونی که دوست داری
import { TriangleAlert } from "lucide-react";
import { toast } from "react-hot-toast";

interface Props {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function showErrorToast({
  title,
  description,
  actionLabel,
  onAction,
}: Props) {
  toast.custom((t) => (
    <div
      className={`flex items-center justify-between w-full max-w-sm bg-error-100 border border-error-200 rounded-lg px-4 py-4 shadow-lg ${
        t.visible ? "animate-enter" : "animate-leave"
      }`}
    >
      <div className="flex items-start gap-3">
        <TriangleAlert className="text-error-500 w-5 h-5 mt-1" />
        <div className="text-sm font-roboto">
          <p className="text-error-600 font-medium">{title}</p>
          <p className="text-error-500 text-xs">{description}</p>
        </div>
      </div>
      {actionLabel && onAction && (
        <button
          className="ml-4 bg-blackNew-50 text-white text-xs font-medium px-3 py-2 rounded-md hover:bg-gray-800 transition"
          onClick={() => {
            onAction();
            toast.dismiss(t.id);
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  ));
}
