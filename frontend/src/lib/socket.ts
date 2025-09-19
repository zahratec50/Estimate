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
