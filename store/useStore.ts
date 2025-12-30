import { create } from 'zustand';

interface State {
    scrollProgress: number;
    currentSection: number;
    setScrollProgress: (progress: number) => void;
    setCurrentSection: (section: number) => void;
}

export const useStore = create<State>((set) => ({
    scrollProgress: 0,
    currentSection: 0,
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    setCurrentSection: (section) => set({ currentSection: section }),
}));
