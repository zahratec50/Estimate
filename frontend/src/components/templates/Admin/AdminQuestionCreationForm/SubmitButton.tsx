"use client";

import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export default function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className="bg-indigo-600 text-white"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <svg
            className="animate-spin h-5 w-5 mr-2"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
          </svg>
          Creating...
        </>
      ) : (
        "Create Question"
      )}
    </Button>
  );
}