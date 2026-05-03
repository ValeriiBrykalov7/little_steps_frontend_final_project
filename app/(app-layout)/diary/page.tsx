'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ConfirmationModal } from '@/components/ConfirmationModal/ConfirmationModal';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { Loader } from '@/components/Loader/Loader';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import DiaryList from '@/components/DiaryList/DiaryList';
import { getAllDiaries } from '@/lib/api/clientApi';
import { useDiaryDeleteModal } from '@/lib/hooks/useDiaryDeleteModal';
import { useAuthStore } from '@/lib/store/authStore';
import type { GetAllDiariesResponse } from '@/types/diary';
import css from './page.module.css';

const DiaryListPage = () => {
  const { isAuthenticated, isAuthChecked } = useAuthStore();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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

  const diaries = diaryData?.diary ?? [];
  const defaultEntry = diaries[0];

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1440px)');
    const sync = () => setIsDesktop(media.matches);

    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  if (!isAuthChecked || (isAuthenticated && isLoading)) return <Loader />;

  return (
    <section className={css.diary}>
      <GreetingBlock />
      <div className='container'>
        {isError && <p>An error occurred: {error.message}</p>}
        {!isError && diaries.length === 0 && (
          <p>Наразі записи у щоденнику відсутні</p>
        )}
        {isDesktop && defaultEntry ? (
          <div className={css.content}>
            <div className={css.desktopList}>
              <DiaryList diaries={diaries} />
            </div>
            <div className={css.details}>
              <DiaryEntryDetails
                entry={defaultEntry}
                onEdit={() => setIsEditModalOpen(true)}
                onDelete={openDeleteConfirm}
              />
            </div>
          </div>
        ) : (
          <DiaryList diaries={diaries} />
        )}
      </div>

      {isEditModalOpen && defaultEntry && <p>Тут буде підключено модальне вікно.</p>}

      {isDeleteConfirmOpen && defaultEntry && (
        <ConfirmationModal
          title='Видалити цей запис з щоденника?'
          confirmButtonText='Видалити'
          cancelButtonText='Скасувати'
          onConfirm={() => confirmDelete(defaultEntry._id)}
          onCancel={closeDeleteConfirm}
        />
      )}
    </section>
  );
};

export default DiaryListPage;
