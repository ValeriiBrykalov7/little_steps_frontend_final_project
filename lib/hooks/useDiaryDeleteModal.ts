'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { deleteDiary } from '@/lib/api/clientApi';

export const useDiaryDeleteModal = () => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteDiaryMutation = useMutation({
    mutationFn: deleteDiary,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['diaries'] });
      toast.success('Запис видалено');
      setIsDeleteConfirmOpen(false);
      router.push('/diary');
    },
    onError: (err: unknown) => {
      toast.error(
        err instanceof Error ? err.message : 'Не вдалося видалити запис',
      );
    },
  });

  return {
    isDeleteConfirmOpen,
    openDeleteConfirm: () => setIsDeleteConfirmOpen(true),
    closeDeleteConfirm: () => setIsDeleteConfirmOpen(false),
    confirmDelete: (entryId: string) => deleteDiaryMutation.mutateAsync(entryId),
  };
};
