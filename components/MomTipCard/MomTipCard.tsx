'use client';

import { useQuery } from '@tanstack/react-query';
import { nextServer } from '@/lib/api/api';
import type { StatusBlockProps } from '@/types/week';

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
    <div className='mom-tip-card'>
      <h3>Порада для мами</h3>
      <p>{currentTip.tip}</p>
    </div>
  );
};
