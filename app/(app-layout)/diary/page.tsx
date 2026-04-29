'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import DiaryEntryCard from '@/components/DiaryEntryCard/DiaryEntryCard';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { Loader } from '@/components/Loader/Loader';
import { getAllDiaries } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import type { DiaryEntry } from '@/types/diary';
import css from './page.module.css';

const DiaryListPage = () => {
  const router = useRouter();
  const { isAuthenticated, isAuthChecked } = useAuthStore();
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);

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

  const selectedEntryExists = diaries.some(
    (card) => card._id === selectedEntryId,
  );
  const activeEntryId = selectedEntryExists ? selectedEntryId : diaries[0]?._id;

  const handleClick = (card: DiaryEntry) => {
    setSelectedEntryId(card._id);
    router.push(`/diary/${card._id}`);
  };

  if (!isAuthChecked || (isAuthenticated && isLoading)) return <Loader />;

  return (
    <section className={css.diary}>
      <GreetingBlock />
      <div className='container'>
        {isError && <p>An error occurred: {error.message}</p>}
        {!isError && diaries.length === 0 && (
          <p>Наразі записи у щоденнику відсутні</p>
        )}

        <ul className={css.diaryList}>
          {diaries.map((card) => (
            <DiaryEntryCard
              key={card._id}
              card={card}
              isActive={card._id === activeEntryId}
              onClick={() => handleClick(card)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DiaryListPage;
