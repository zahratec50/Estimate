import { socket as realSocket } from "./socket";

export function getSocket() {
  if (typeof window === "undefined") return { on: () => {}, emit: () => {}, off: () => {} };
  return realSocket;
}
