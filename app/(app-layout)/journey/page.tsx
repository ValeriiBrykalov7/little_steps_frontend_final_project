'use client';

import { WeekSelector } from '@/components/WeekSelector/WeekSelector';
import css from './page.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { Loader } from '@/components/Loader/Loader';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { getDashboardInfo } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';

export default function JourneyPage() {
  const { isAuthenticated, isAuthChecked } = useAuthStore();

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
    <>
      <section className={css.journey}>
        <div className='container'>
          <GreetingBlock />
          <WeekSelector currentWeek={data.currentWeek} />
        </div>
      </section>
    </>
  );
}
