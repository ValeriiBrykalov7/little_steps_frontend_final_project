'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import css from './page.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { Loader } from '@/components/Loader/Loader';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { WeekSelector } from '@/components/WeekSelector/WeekSelector';
import { getDashboardInfo } from '@/lib/api/clientApi';

export default function JourneyWeekPage() {
  const { isAuthenticated, isAuthChecked } = useAuthStore();
  const params = useParams<{ weekNumber: string }>();
  const selectedWeek = Number(params.weekNumber);

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', isAuthenticated],
    queryFn: () => getDashboardInfo(isAuthenticated),
    enabled: isAuthChecked,
    staleTime: 1000 * 60 * 5,
  });

  if (!isAuthChecked || isLoading) return <Loader />;

  if (!data) return <div>No data found.</div>;

  return (
    <section className={css.journeyWeek}>
      <div className='container'>
        <GreetingBlock />
        <WeekSelector
          currentWeek={data.currentWeek}
          selectedWeek={selectedWeek}
        />
      </div>
    </section>
  );
}
