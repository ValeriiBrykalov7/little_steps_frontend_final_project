'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AddTaskModal } from '@/components/AddTaskModal/AddTaskModal';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { Loader } from '@/components/Loader/Loader';
import TasksReminderCard from '@/components/TaskReminderCard/TaskReminderCard';
import { WeekSelector } from '@/components/WeekSelector/WeekSelector';
import { getDashboardInfo, createTask } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './page.module.css';
import type { CreateTaskRequest } from '@/types/task';
import AddTaskForm from '@/components/AddTaskForm/AddTaskForm';

export default function JourneyPage() {
  const { isAuthenticated, isAuthChecked } = useAuthStore();
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  // важливо ставити ключ 'dashboard' на всіх інших сторінках, де відбуваєтья запит до getDashboardInfo
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', isAuthenticated],
    queryFn: () => getDashboardInfo(isAuthenticated),
    enabled: isAuthChecked, // це для того, щоб запит не відбувався, поки ми не перевірили автентифікацію
    staleTime: 1000 * 60 * 5, // це для того, щоб дані були свіжими 5 хвилин, а потім відбувався знову запит на сервак
  });

  if (!isAuthChecked || isLoading) return <Loader />;

  if (!data) return <div>No data found.</div>;
  const handleCreateTask = async (task: CreateTaskRequest) => {
        await createTask(task);
  };
  return (
    <>
      <section className={css.journey}>
        <div className='container'>
          <GreetingBlock />
          <WeekSelector currentWeek={data.currentWeek} />
          <TasksReminderCard
            openAddTaskModal={() => setIsAddTaskModalOpen(true)}
          />
        </div>
      </section>

      {isAddTaskModalOpen && (
          <AddTaskModal onClose={() => setIsAddTaskModalOpen(false)}>
            <AddTaskForm onSubmit={handleCreateTask} onClose={() => setIsAddTaskModalOpen(false)} />
          </AddTaskModal>
      )}
    </>
  );
}
