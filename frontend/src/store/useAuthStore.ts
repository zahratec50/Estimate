// import { create } from "zustand";
// import {
//   loginRequest,
//   registerRequest,
//   refreshAccessTokenRequest,
//   logoutRequest,
//   meRequest,
//   User,
//   LoginResponse,
// } from "@/services/authService";

// interface AuthState {
//   user: User | null;
//   accessToken: string | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   error: string | null;

//   login: (email: string, password: string) => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;
//   refreshAccessToken: () => Promise<void>;
//   checkAuth: () => Promise<void>;
//   logout: () => Promise<void>;

//   setAccessToken: (token: string | null) => void;
//   setError: (err: string | null) => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   accessToken: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,

//   setAccessToken: (token) => set({ accessToken: token, isAuthenticated: !!token }),
//   setError: (err) => set({ error: err }),

//   login: async (email, password) => {
//     set({ loading: true, error: null });
//     try {
//       const data: LoginResponse = await loginRequest(email, password);
//       set({
//         user: data.user,
//         accessToken: data.accessToken,
//         isAuthenticated: true,
//         loading: false,
//       });
//     } catch (e: any) {
//       set({ error: e?.response?.data?.message || "Login failed", loading: false });
//     }
//   },

//   register: async (name, email, password) => {
//     set({ loading: true, error: null });
//     try {
//       const data: LoginResponse = await registerRequest(name, email, password);
//       set({
//         user: data.user,
//         accessToken: data.accessToken,
//         isAuthenticated: true,
//         loading: false,
//       });
//     } catch (e: any) {
//       set({ error: e?.response?.data?.message || "Registration failed", loading: false });
//     }
//   },

//   refreshAccessToken: async () => {
//     try {
//       const { accessToken } = await refreshAccessTokenRequest();
//       set({ accessToken, isAuthenticated: true });
//     } catch {
//       set({ user: null, accessToken: null, isAuthenticated: false });
//     }
//   },

//   checkAuth: async () => {
//     try {
//       const { user, accessToken } = await meRequest(); // اگر refresh معتبر باشد، user می‌دهد
//       set({
//         user,
//         accessToken: accessToken ?? null,
//         isAuthenticated: true,
//       });
//     } catch {
//       set({ user: null, accessToken: null, isAuthenticated: false });
//     }
//   },

//   logout: async () => {
//     try {
//       await logoutRequest();
//     } finally {
//       set({ user: null, accessToken: null, isAuthenticated: false });
//     }
//   },
// }));
