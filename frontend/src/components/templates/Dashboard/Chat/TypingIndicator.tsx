"use client";

import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 text-xs text-gray-500 px-3 py-2">
      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "120ms" }} />
      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "240ms" }} />
      <span className="ml-1">typing…</span>
    </div>
  );
}
