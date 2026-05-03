'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { Loader } from '@/components/Loader/Loader';
import { ConfirmationModal } from '@/components/ConfirmationModal/ConfirmationModal';
import { getAllDiaries } from '@/lib/api/clientApi';
import { useDiaryDeleteModal } from '@/lib/hooks/useDiaryDeleteModal';
import { useAuthStore } from '@/lib/store/authStore';
import type { GetAllDiariesResponse } from '@/types/diary';
import css from './page.module.css';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import DiaryList from '@/components/DiaryList/DiaryList';

const DiaryCurrentPage = () => {
  const { isAuthenticated, isAuthChecked } = useAuthStore();
  const params = useParams<{ entryId: string }>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const entryId = [params?.entryId].flat()[0] as string | undefined;
  const {
    isDeleteConfirmOpen,
    openDeleteConfirm,
    closeDeleteConfirm,
    confirmDelete,
  } = useDiaryDeleteModal();

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
  const currentEntry = entryId
    ? diaries.find((e) => e._id === entryId)
    : undefined;

  return (
    <section
      className={`${css.diary}${
        currentEntry ? ` ${css.hideGreetingMobileTablet}` : ''
      }`}
    >
      <div className={css.greeting}>
        <GreetingBlock />
      </div>
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
            <div className={css.details}>
              <DiaryEntryDetails
                entry={currentEntry}
                onEdit={() => setIsEditModalOpen(true)}
                onDelete={openDeleteConfirm}
              />
            </div>
          </div>
        )}
      </div>

      {isEditModalOpen && currentEntry && <p>Тут буде підключено модальне вікно.</p>}

      {isDeleteConfirmOpen && currentEntry && (
        <ConfirmationModal
          title='Видалити цей запис з щоденника?'
          confirmButtonText='Видалити'
          cancelButtonText='Скасувати'
          onConfirm={() => confirmDelete(currentEntry._id)}
          onCancel={closeDeleteConfirm}
        />
      )}
    </section>
  );
};

export default DiaryCurrentPage;
