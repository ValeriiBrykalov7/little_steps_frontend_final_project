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

export default function JourneyPage() {
  const { isAuthenticated, isAuthChecked } = useAuthStore();
  const params = useParams<{ weekNumber: string }>();
  const selectedWeek = Number(params.weekNumber);

  // важливо ставити ключ 'dashboard' на всіх інших сторінках, де відбуваєтья запит до getDashboardInfo
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', isAuthenticated],
    queryFn: () => getDashboardInfo(isAuthenticated),
    enabled: isAuthChecked, // це для того, щоб запит не відбувався, поки ми не перевірили автентифікацію
    staleTime: 1000 * 60 * 5, // це для того, щоб дані були свіжими 5 хвилин, а потім відбувався знову запит на сервак
  });

  if (!isAuthChecked || isLoading) return <Loader />;

  if (!data) return <div>No data found.</div>;

  return (
    <section className={css.journeyWeek}>
      <div className='container'>
        <GreetingBlock />
        <div className={css.weekSelectorSlot}>
          <WeekSelector
            currentWeek={data.currentWeek}
            selectedWeek={selectedWeek}
          />
        </div>
        <JourneyDetails weekNumber={data.currentWeek} />
      </div>
    </section>
  );
}
