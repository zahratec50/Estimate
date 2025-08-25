import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const makeDMId = (a: string, b: string) => [a, b].sort().join("-");

export const nowIso = () => new Date().toISOString();

export const shortTime = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

export const lastSeenLabel = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  return `Last seen: ${d.toLocaleString()}`;
};
