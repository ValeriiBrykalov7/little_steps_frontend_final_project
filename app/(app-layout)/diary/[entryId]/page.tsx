'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import { Loader } from '@/components/Loader/Loader';
import { ConfirmationModal } from '@/components/ConfirmationModal/ConfirmationModal';
import { deleteDiary, getAllDiaries } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import type { GetAllDiariesResponse } from '@/types/diary';
import css from './page.module.css';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import DiaryList from '@/components/DiaryList/DiaryList';

const DiaryCurrentPage = () => {
  const { isAuthenticated, isAuthChecked } = useAuthStore();
  const params = useParams<{ entryId: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const entryId = [params?.entryId].flat()[0] as string | undefined;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const deleteDiaryMutation = useMutation({
    mutationFn: deleteDiary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diaries'] });
      toast.success('Запис видалено');
      router.push('/diary');
    },
    onError: (err: Error) =>
      toast.error(err.message || 'Не вдалося видалити запис'),
  });

  if (!isAuthChecked || (isAuthenticated && isLoading)) return <Loader />;

  const diaries = diaryData?.diary ?? [];
  const currentEntry = entryId
    ? diaries.find((e) => e._id === entryId)
    : undefined;

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
              onDelete={() => setShowDeleteConfirm(true)}
            />
          </div>
        )}
      </div>

      {showDeleteConfirm && currentEntry && (
        <ConfirmationModal
          title='Видалити цей запис з щоденника?'
          confirmButtonText='Видалити'
          cancelButtonText='Скасувати'
          onConfirm={() => deleteDiaryMutation.mutate(currentEntry._id)}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </section>
  );
};

export default DiaryCurrentPage;
