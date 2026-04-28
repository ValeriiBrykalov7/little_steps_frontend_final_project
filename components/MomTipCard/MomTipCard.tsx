'use client';

import { useQuery } from '@tanstack/react-query';
import { nextServer } from '@/lib/api/api';
import type { StatusBlockProps } from '@/types/week';
import css from './MomTipCard.module.css';

type CurrentWeekProps = Pick<StatusBlockProps, 'currentWeek'>;

export const MomTipCard = ({ currentWeek }: CurrentWeekProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['momTips', currentWeek],
    queryFn: async () => {
      const res = await nextServer.get(`/weeks/mom/${currentWeek}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Завантаження...</div>;
  if (isError || !data || !data.comfortTips?.length) return null;

  const currentTip = data.comfortTips[0];

  return (
    <div className={css['mom-tip-card']}>
      <h2 className={css['card-title']}>Порада для мами</h2>
      <p className={css['card-text']}>{currentTip.tip}</p>
    </div>
  );
};
