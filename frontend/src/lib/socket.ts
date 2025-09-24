// import {Socket as IOSocket } from "socket.io-client";
// import io from "socket.io-client";

// let socket: IOSocket<DefaultEventsMap, DefaultEventsMap> | null = null;

// export function getSocket(): Socket {
//   if (!socket) {
//     socket = io("/api/socket", { path: "/api/socket", autoConnect: true });
//   }
//   return socket;
// }


// socket.ts
import { Socket } from "socket.io-client"; // مستقیماً Socket رو import می‌کنیم
import io from "socket.io-client";
// import type { Socket as SocketType } from "socket.io-client";

let socket: ReturnType<typeof io> | null = null;

export function getSocket(): ReturnType<typeof io> {
  if (!socket) {
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin;
    socket = io(socketUrl, {
      path: "/api/socket",
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect_error", (err: Error) => {
      console.error("Socket connection error:", err.message);
    });

    socket.on("reconnect", (attempt: number) => {
      console.log(`Socket reconnected after ${attempt} attempts`);
    });
  }
  return socket;
}