'use client';

import { useQuery } from '@tanstack/react-query';
import GreetingBlock from '@/components/dashboard/GreetingBlock/GreetingBlock';
import { Loader } from '@/components/common/Loader/Loader';
import { WeekSelector } from '@/components/journey/WeekSelector/WeekSelector';
import JourneyDetails from '@/components/journey/JourneyDetails/JourneyDetails';
import { getDashboardInfo } from '@/lib/api/clientApi';
import { FIRST_WEEK, getActiveWeek } from '@/lib/helper/week';
import { useAuthStore } from '@/lib/store/authStore';
import css from './page.module.css';

type Props = {
  selectedWeek?: number;
};

export default function JourneyPageContent({ selectedWeek }: Props) {
  const { isAuthenticated, isAuthChecked } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', isAuthenticated],
    queryFn: () => getDashboardInfo(isAuthenticated),
    enabled: isAuthChecked,
    staleTime: 1000 * 60 * 5,
  });

  const activeWeek = data
    ? getActiveWeek(data.currentWeek, selectedWeek)
    : FIRST_WEEK;

  if (!isAuthChecked || isLoading) return <Loader />;

  if (!data) return <div>No data found.</div>;

  return (
    <section className={css.journeyWeek}>
      <div className='container'>
        <GreetingBlock />

        <div className={css.weekSelectorSlot}>
          <WeekSelector
            currentWeek={data.currentWeek}
            selectedWeek={activeWeek}
          />
        </div>

        <JourneyDetails weekNumber={activeWeek} />
      </div>
    </section>
  );
}
