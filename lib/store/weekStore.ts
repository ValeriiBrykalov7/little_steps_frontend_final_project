import { create } from 'zustand'; 
import { getDashboardInfo } from '../api/clientApi';

interface WeekState{
    dashboardData: any | null;
  isLoading: boolean;
  fetchDashboard: (hasUser: boolean) => Promise<void>;
}

export const useWeekStore= create<WeekState>((set)=>({
    dashboardData:null,
    isLoading:false,
    fetchDashboard: async (isAuthenticated: boolean) => {
    set({ isLoading: true });
    try {
      const data = await getDashboardInfo(isAuthenticated);
      set({ dashboardData: data, isLoading: false });
    } catch (error) {
      if (isAuthenticated) {
        const publicData = await getDashboardInfo(false);
        set({ dashboardData: publicData, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    }
  },
}))

