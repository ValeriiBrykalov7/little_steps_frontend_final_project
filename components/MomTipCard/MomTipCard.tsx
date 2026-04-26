'use client';

import { useWeekStore } from '@/lib/store/weekStore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const MomTipCard = () => {
  const selectedWeek = useWeekStore((state) => state.selectedWeek);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['momTips', selectedWeek],
    queryFn: async () => {
      const res = await axios.get(`/api/weeks/mom/${selectedWeek}`);
      return res.data;
    },
    enabled: typeof selectedWeek === 'number',
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
