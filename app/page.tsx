'use client';
import { useAuthStore } from '@/lib/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { getDashboardInfo } from '@/lib/api/clientApi';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import StatusBlock from '@/components/StatusBlock/StatusBlock';
import { Loader } from '@/components/Loader/Loader';
// import { useState } from 'react';
// import { AddTaskModal } from '@/components/AddTaskModal/AddTaskModal';



export default function DashboardPage() {
  const { isAuthenticated, isAuthChecked } = useAuthStore();
// const [isModalOpen, setIsModalOpen] = useState(false);
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
      <GreetingBlock />
      <StatusBlock
        daysToMeeting={data.daysToMeeting}
        currentWeek={data.currentWeek}
      />
      
      
      {/* <button onClick={() => setIsModalOpen(true)}>Відкрити модалку</button>
       {isModalOpen && (
        <AddTaskModal onClose={() => setIsModalOpen(false)}>
        < a onClose={() => setIsModalOpen(false)} />
        </AddTaskModal>
      )}  */}
    </>
  );
}
