'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { Loader } from '@/components/Loader/Loader';
import { WeekSelector } from '@/components/WeekSelector/WeekSelector';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
import { getDashboardInfo } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './page.module.css';

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
        <WeekSelector currentWeek={data.currentWeek} selectedWeek={selectedWeek} />
        <JourneyDetails weekNumber={selectedWeek} />
      </div>
    </section>
  );
}
