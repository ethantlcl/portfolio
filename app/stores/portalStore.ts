import { create } from 'zustand';

interface PortalStore {
  activePortalId: string | null;
  expandedProjectId: number | null;
  setActivePortal: (activePortalId: string | null) => void;
  setExpandedProjectId: (expandedProjectId: number | null) => void;
}

export const usePortalStore = create<PortalStore>((set) => ({
  activePortalId: null,
  expandedProjectId: null,
  setActivePortal: (activePortalId) => set(() => ({ activePortalId })),
  setExpandedProjectId: (expandedProjectId) => set(() => ({ expandedProjectId })),
}))
