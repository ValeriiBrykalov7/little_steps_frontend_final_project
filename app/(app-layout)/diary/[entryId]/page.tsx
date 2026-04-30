'use client';

import { useQuery } from '@tanstack/react-query';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { Loader } from '@/components/Loader/Loader';
import { getAllDiaries } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import type { GetAllDiariesResponse } from '@/types/diary';
import css from './page.module.css';
import DiaryList from '@/components/DiaryList/DiaryList';

const DiaryCurrentPage = () => {
  const { isAuthenticated, isAuthChecked } = useAuthStore();

  const {
    data: diaryData,
    isLoading,
    isError,
    error,
  } = useQuery<GetAllDiariesResponse>({
    queryKey: ['diaries', isAuthenticated],
    queryFn: getAllDiaries,
    enabled: isAuthChecked && isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });

  if (!isAuthChecked || (isAuthenticated && isLoading)) return <Loader />;

  const diaries = diaryData?.diary ?? [];

  return (
    <section className={css.diary}>
      <GreetingBlock />
      <div className='container'>
        {isError && <p>An error occurred: {error.message}</p>}
        {!isError && diaries.length === 0 && (
          <p>Наразі записи у щоденнику відсутні</p>
        )}

        <ul className={css.diaryList}>
          <DiaryList diaries={diaries} />
        </ul>
      </div>
    </section>
  );
};

export default DiaryCurrentPage;
