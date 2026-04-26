import { create } from 'zustand';

interface WeekState {
  selectedWeek: number;
  setSelectedWeek: (week: number) => void;
}

export const useWeekStore = create<WeekState>((set) => ({
  selectedWeek: 0,

  setSelectedWeek: (week) => set({ selectedWeek: week }),
}));
