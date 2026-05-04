'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { getDashboardInfo } from '@/lib/api/clientApi';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import TasksReminderCard from '@/components/TaskReminderCard/TaskReminderCard';
import FeelingCheckcard from '@/components/FeelingCheckcard/FeelingCheckcard';
import { Loader } from '@/components/Loader/Loader';
import { BabyTodayCard } from '@/components/BabyTodayCard/BabyTodayCard';
import { MomTipCard } from '@/components/MomTipCard/MomTipCard';
import { AddTaskModal } from '@/components/AddTaskModal/AddTaskModal';
import AddTaskForm from '@/components/AddTaskForm/AddTaskForm';
import { AddDiaryEntryModal } from '@/components/AddDiaryEntryModal/AddDiaryEntryModal';
import AddDiaryEntryForm from '@/components/AddDiaryEntryForm/AddDiaryEntryForm';
import css from './page.module.css';

export default function DashboardPageClient() {
  const { isAuthenticated, isAuthChecked } = useAuthStore();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', isAuthenticated],
    queryFn: () => getDashboardInfo(isAuthenticated),
    enabled: isAuthChecked,
    staleTime: 1000 * 60 * 5,
  });

  if (!isAuthChecked || isLoading) return <Loader />;

  if (!data) return <div>No data found.</div>;

  return (
    <>
      <section className={css.dashboard}>
        <div className='container'>
          <GreetingBlock />

          <div className={css.dashboard_content}>
            <div className={css.dashboard_greeting_status}>
              <StatusBlock
                daysToMeeting={data.daysToMeeting}
                currentWeek={data.currentWeek}
              />
              <BabyTodayCard dataBaby={data.baby} />
              <MomTipCard currentTip={data.dailyAdvice} />
            </div>

            <div className={css.dashboard_task_diary}>
              <TasksReminderCard
                openAddTaskModal={() => {
                  setIsAddTaskModalOpen(true);
                }}
              />

              <FeelingCheckcard
                openAddDiaryModal={() => {
                  setIsDiaryModalOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {isAddTaskModalOpen && (
        <AddTaskModal onClose={() => setIsAddTaskModalOpen(false)}>
          {({ close }) => <AddTaskForm onClose={close} />}
        </AddTaskModal>
      )}

      {isDiaryModalOpen && (
        <AddDiaryEntryModal onClose={() => setIsDiaryModalOpen(false)}>
          {({ close }) => <AddDiaryEntryForm onClose={close} />}
        </AddDiaryEntryModal>
      )}
    </>
  );
}
