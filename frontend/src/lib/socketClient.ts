"use client";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (socket) return socket;
  const url =
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_SOCKET_URL) ||
    (typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.hostname}:3000`
      : "http://localhost:3000");
  socket = io(url, { transports: ["websocket", "polling"] });
  return socket;
}
