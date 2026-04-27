'use client';
import { useAuthStore } from '@/lib/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { getDashboardInfo } from '@/lib/api/clientApi';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import {Loader} from '@/components/Loader/Loader';

export default function DashboardPage() {
  const { isAuthenticated } = useAuthStore();

  // важливо ставити ключ 'dashboard' на всіх інших сторінках, де відбуваєтья запит до getDashboardInfo
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', isAuthenticated],
    queryFn: () => getDashboardInfo(isAuthenticated),
    staleTime: 1000 * 60 * 5, // це для того, щоб дані були свіжими 5 хвилин, а потім відбувався знову запит на сервак
  });

  if (isLoading)
    return (
        <Loader />
      
    );
  if (!data) return <div>No data found.</div>;
  return (
    <>
      <GreetingBlock />
      <StatusBlock
        daysToMeeting={data.daysToMeeting}
        currentWeek={data.currentWeek}
      />
    </>
  );
}
