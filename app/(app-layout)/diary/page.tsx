'use client';

import { useQuery } from '@tanstack/react-query';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { Loader } from '@/components/Loader/Loader';
import { getAllDiaries } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import type { DiaryEntry } from '@/types/diary';
import css from './page.module.css';
import DiaryList from '@/components/DiaryList/DiaryList';

const DiaryListPage = () => {
  const { isAuthenticated, isAuthChecked } = useAuthStore();

  const {
    data: diaries = [],
    isLoading,
    isError,
    error,
  } = useQuery<DiaryEntry[]>({
    queryKey: ['diaries', isAuthenticated],
    queryFn: getAllDiaries,
    enabled: isAuthChecked && isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });

  if (!isAuthChecked || (isAuthenticated && isLoading)) return <Loader />;

  return (
    <section className={css.diary}>
      <GreetingBlock />
      <div className='container'>
        {isError && <p>An error occurred: {error.message}</p>}
        {!isError && diaries.length === 0 && (
          <p>Наразі записи у щоденнику відсутні</p>
        )}
        <DiaryList diaries={diaries} />
      </div>
    </section>
  );
};

export default DiaryListPage;
