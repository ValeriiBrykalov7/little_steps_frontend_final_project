'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { Loader } from '@/components/Loader/Loader';
import { getAllDiaries } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import type { DiaryEntry } from '@/types/diary';
import css from './page.module.css';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import DiaryList from '@/components/DiaryList/DiaryList';

const DiaryCurrentPage = () => {
  const { isAuthenticated, isAuthChecked } = useAuthStore();
  const params = useParams<{ entryId: string }>();
  const entryId = params?.entryId;

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

  const currentEntry = diaries.find((entry) => entry._id === entryId);

  return (
    <section className={css.diary}>
      <GreetingBlock />
      <div className='container'>
        {isError && <p>An error occurred: {error.message}</p>}
        {!isError && diaries.length === 0 && (
          <p>Наразі записи у щоденнику відсутні</p>
        )}
        {!isError && diaries.length > 0 && !currentEntry && <p>Запис не знайдено</p>}

        {!isError && diaries.length > 0 && currentEntry && (
          <div className={css.content}>
            <div className={css.desktopList}>
              <DiaryList diaries={diaries} />
            </div>
            <DiaryEntryDetails
              entry={currentEntry}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default DiaryCurrentPage;
