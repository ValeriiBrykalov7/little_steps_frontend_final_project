'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
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
import { useState } from 'react';
import { AddDiaryEntryModal } from '@/components/AddDiaryEntryModal/AddDiaryEntryModal';
import AddDiaryEntryForm from '@/components/AddDiaryEntryForm/AddDiaryEntryForm';

const DiaryCurrentPage = () => {
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
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
    <>
      <section className={css.diary}>
        <GreetingBlock />
        <div className='container'>
          {!isError && diaries.length > 0 && currentEntry && (
            <div className={css.content}>
              <div className={css.desktopList}>
                <DiaryList
                  diaries={diaries}
                  openAddDiaryEntryModal={() => setIsDiaryModalOpen(true)}
                />
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

          {!isError && (!currentEntry || diaries.length === 0) && (
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

      {isDeleteConfirmOpen && currentEntry && (
        <ConfirmationModal
          title='Видалити цей запис з щоденника?'
          confirmButtonText='Видалити'
          cancelButtonText='Скасувати'
          onConfirm={() => confirmDelete(currentEntry._id)}
          onCancel={closeDeleteConfirm}
        />
      )}

      {isEditModalOpen && currentEntry && (
        <AddDiaryEntryModal
          title='Редагування'
          onClose={() => setIsEditModalOpen(false)}
        >
          {({ close }) => (
            <AddDiaryEntryForm entry={currentEntry} onClose={close} />
          )}
        </AddDiaryEntryModal>
      )}
    </>
  );
};

export default DiaryCurrentPage;
