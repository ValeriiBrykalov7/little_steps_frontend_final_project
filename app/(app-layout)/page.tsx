'use client';
import { useAuthStore } from '@/lib/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { getDashboardInfo } from '@/lib/api/clientApi';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import TasksReminderCard from '@/components/TaskReminderCard/TaskReminderCard';
import FeelingCheckcard from '@/components/FeelingCheckcard/FeelingCheckcard';
import { Loader } from '@/components/Loader/Loader';
import css from './page.module.css';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { isAuthenticated, isAuthChecked } = useAuthStore();
 const router=useRouter();
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
      <section className={css.dashboard}>
        <div className='container'>
          <div className={css.dashboard_greeting_status}>
            <GreetingBlock />
            <StatusBlock
              daysToMeeting={data.daysToMeeting}
              currentWeek={data.currentWeek}
            />
          </div>
          
          <div className={css.dashboard_task_diary}>
            <TasksReminderCard/>
            <FeelingCheckcard openAddDiaryEntryModal={()=>{router.push('/diary')}}/> {/* для прикладу */}
          </div>
          
        </div>
        <div className='container'> 
          
        </div>
      </section>
    </>
  );
}
