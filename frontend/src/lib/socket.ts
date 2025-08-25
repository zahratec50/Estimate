// import { io } from "socket.io-client";

// export const socket = io("http://localhost:4000", {
//   transports: ["websocket"],
// });

// src/lib/socket.ts
class MockSocket {
  on(event: string, callback: Function) {
    console.log(`[MockSocket] Listening for ${event}`);
  }
  off(event: string) {
    console.log(`[MockSocket] Stop listening ${event}`);
  }
  emit(event: string, data?: any) {
    console.log(`[MockSocket] Emitted ${event}`, data);
  }
}

export const socket = new MockSocket();
