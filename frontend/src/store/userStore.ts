import { create } from "zustand";

interface UserStore {
  search: string;
  role: string;
  page: number;
  setSearch: (s: string) => void;
  setRole: (r: string) => void;
  setPage: (p: number) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  search: "",
  role: "",
  page: 1,
  setSearch: (s) => set({ search: s, page: 1 }),
  setRole: (r) => set({ role: r, page: 1 }),
  setPage: (p) => set({ page: p }),
}));
