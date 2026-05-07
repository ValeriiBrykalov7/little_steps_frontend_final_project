'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AddDiaryEntryModal } from '@/components/AddDiaryEntryModal/AddDiaryEntryModal';
import AddDiaryEntryForm from '@/components/AddDiaryEntryForm/AddDiaryEntryForm';
import { ConfirmationModal } from '@/components/ConfirmationModal/ConfirmationModal';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import DiaryList from '@/components/DiaryList/DiaryList';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { Loader } from '@/components/Loader/Loader';
import { getAllDiaries } from '@/lib/api/clientApi';
import { useDiaryDeleteModal } from '@/lib/hooks/useDiaryDeleteModal';
import { useAuthStore } from '@/lib/store/authStore';
import type { DiaryEntry, GetAllDiariesResponse } from '@/types/diary';
import css from './page.module.css';

type DiaryPageClientProps = {
  entryId?: string;
};

const getSelectedEntry = (
  diaries: DiaryEntry[],
  entryId?: string,
): DiaryEntry | undefined => {
  if (entryId) {
    return diaries.find((entry) => entry._id === entryId);
  }

  return diaries[0];
};

const DiaryPageClient = ({ entryId }: DiaryPageClientProps) => {
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { isAuthenticated, isAuthChecked } = useAuthStore();
  const isEntryPage = Boolean(entryId);

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
  const selectedEntry = getSelectedEntry(diaries, entryId);
  const shouldShowDetails = !isError && diaries.length > 0 && selectedEntry;
  const shouldShowListFallback = !isEntryPage || !isError;

  return (
    <>
      <section className={css.diary}>
        <GreetingBlock />

        <div className='container'>
          {shouldShowDetails ? (
            <div className={css.content}>
              <div
                className={`${css.listPane} ${
                  isEntryPage ? css.hideListOnMobile : ''
                }`}
              >
                <DiaryList
                  diaries={diaries}
                  openAddDiaryEntryModal={() => setIsDiaryModalOpen(true)}
                />
              </div>

              <div
                className={`${css.detailsPane} ${
                  isEntryPage ? '' : css.hideDetailsOnMobile
                }`}
              >
                <DiaryEntryDetails
                  entry={selectedEntry}
                  onEdit={() => setIsEditModalOpen(true)}
                  onDelete={openDeleteConfirm}
                />
              </div>
            </div>
          ) : (
            shouldShowListFallback && (
              <DiaryList
                diaries={diaries}
                openAddDiaryEntryModal={() => setIsDiaryModalOpen(true)}
              />
            )
          )}

          {isError && (
            <p className={css.feedbackText}>
              An error occurred: {error.message}
            </p>
          )}

          {!isError && diaries.length === 0 && (
            <p className={css.emptyText}>
              Наразі записи у щоденнику відсутні
            </p>
          )}
        </div>
      </section>

      {isDiaryModalOpen && (
        <AddDiaryEntryModal onClose={() => setIsDiaryModalOpen(false)}>
          {({ close }) => <AddDiaryEntryForm onClose={close} />}
        </AddDiaryEntryModal>
      )}

      {isDeleteConfirmOpen && selectedEntry && (
        <ConfirmationModal
          title='Видалити цей запис з щоденника?'
          confirmButtonText='Видалити'
          cancelButtonText='Скасувати'
          onConfirm={() => confirmDelete(selectedEntry._id)}
          onCancel={closeDeleteConfirm}
        />
      )}

      {isEditModalOpen && selectedEntry && (
        <AddDiaryEntryModal
          title={isEntryPage ? 'Редагування' : 'Редагувати запис'}
          onClose={() => setIsEditModalOpen(false)}
        >
          {({ close }) => (
            <AddDiaryEntryForm entry={selectedEntry} onClose={close} />
          )}
        </AddDiaryEntryModal>
      )}
    </>
  );
};

export default DiaryPageClient;
