'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ConfirmationModal } from '@/components/ConfirmationModal/ConfirmationModal';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { Loader } from '@/components/Loader/Loader';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import { getAllDiaries } from '@/lib/api/clientApi';
import { useDiaryDeleteModal } from '@/lib/hooks/useDiaryDeleteModal';
import { useAuthStore } from '@/lib/store/authStore';
import type { GetAllDiariesResponse } from '@/types/diary';
import css from './page.module.css';
import DiaryList from '@/components/DiaryList/DiaryList';
import { AddDiaryEntryModal } from '@/components/AddDiaryEntryModal/AddDiaryEntryModal';
import AddDiaryEntryForm from '@/components/AddDiaryEntryForm/AddDiaryEntryForm';

const DiaryListPage = () => {
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
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
    <>
      <section className={css.diary}>
        <GreetingBlock />
        <div className='container'>
          {isDesktop && defaultEntry ? (
            <div className={css.content}>
              <div className={css.desktopList}>
                <DiaryList
                  diaries={diaries}
                  openAddDiaryEntryModal={() => setIsDiaryModalOpen(true)}
                />
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
            <DiaryList
              diaries={diaries}
              openAddDiaryEntryModal={() => setIsDiaryModalOpen(true)}
            />
          )}

          {isError && (
            <p className={css.feedbackText}>
              An error occurred: {error.message}
            </p>
          )}
          {!isError && diaries.length === 0 && (
            <p className={css.emptyText}>Наразі записи у щоденнику відсутні</p>
          )}
        </div>
      </section>

      {isDiaryModalOpen && (
        <AddDiaryEntryModal onClose={() => setIsDiaryModalOpen(false)}>
          {({ close }) => <AddDiaryEntryForm onClose={close} />}
        </AddDiaryEntryModal>
      )}
      {isDeleteConfirmOpen && defaultEntry && (
        <ConfirmationModal
          title='Видалити цей запис з щоденника?'
          confirmButtonText='Видалити'
          cancelButtonText='Скасувати'
          onConfirm={() => confirmDelete(defaultEntry._id)}
          onCancel={closeDeleteConfirm}
        />
      )}

      {isEditModalOpen && defaultEntry && (
        <AddDiaryEntryModal
          title='Редагувати запис'
          onClose={() => setIsEditModalOpen(false)}
        >
          {({ close }) => (
            <AddDiaryEntryForm entry={defaultEntry} onClose={close} />
          )}
        </AddDiaryEntryModal>
      )}
    </>
  );
};

export default DiaryListPage;
