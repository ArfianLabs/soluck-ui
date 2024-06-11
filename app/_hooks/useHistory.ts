import { create } from "zustand";

interface HistoryState {
  history: string[];
  setHistory: (history: string[]) => void;
  addToHistory: (history: string) => void;
}

export const useHistory = create<HistoryState>((set) => ({
  history: [],

  setHistory: (history: string[]) => set((state) => ({ history: history })),
  addToHistory: (history: string) =>
    set((state) => ({ history: [...state.history, history] })),
}));
