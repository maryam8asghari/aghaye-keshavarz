import { create } from "zustand";
import { cases as mockCases, type Case } from "@/data/cases";

interface AppState {
  role: "farmer" | "local_guide" | "specialist" | null;
  setRole: (role: "farmer" | "local_guide" | "specialist") => void;
  selectedAdvisorId: string | null;
  setSelectedAdvisorId: (id: string | null) => void;
  currentCaseId: string | null;
  setCurrentCaseId: (id: string | null) => void;

  cases: Case[];
  addCase: (c: Case) => void;
  updateCase: (id: string, patch: Partial<Case>) => void;
  getCaseById: (id: string) => Case | undefined;
}

export const useAppStore = create<AppState>((set, get) => ({
  role: null,
  setRole: (role) => set({ role }),
  selectedAdvisorId: null,
  setSelectedAdvisorId: (id) => set({ selectedAdvisorId: id }),
  currentCaseId: null,
  setCurrentCaseId: (id) => set({ currentCaseId: id }),

  cases: [...mockCases],
  addCase: (c) => set((state) => ({ cases: [...state.cases, c] })),
  updateCase: (id, patch) =>
    set((state) => ({
      cases: state.cases.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    })),
  getCaseById: (id) => get().cases.find((c) => c.id === id),
}));
