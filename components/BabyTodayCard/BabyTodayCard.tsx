'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useWeekStore } from '@/lib/store/weekStore';

export const BabyTodayCard = () => {
  const selectedWeek = useWeekStore((state) => state.selectedWeek);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['babyToday', selectedWeek],
    queryFn: async () => {
      const res = await axios.get(`/api/weeks/baby/${selectedWeek}`);
      return res.data;
    },
    enabled: !!selectedWeek || selectedWeek === 0,
  });

  if (isLoading) return <div>Завантаження...</div>;
  if (isError || !data) return null;

  return (
    <div className='card'>
      <h2>Малюк сьогодні</h2>

      <div style={{ position: 'relative', width: '100%', height: '220px' }}>
        <Image
          src={data.image}
          alt={data.analogy || 'Baby illustration'}
          fill
          priority
          style={{ objectFit: 'contain' }}
          sizes='(max-width: 768px) 100vw, 350px'
        />
      </div>

      <div>
        <p>
          <strong>Розмір:</strong> Приблизно {data.babySize} см
        </p>
        <p>
          <strong>Вага:</strong> Близько {data.babyWeight} грамів
        </p>
      </div>

      <div>
        <p>
          <strong>Активність:</strong> {data.babyActivity}
        </p>
        <p>{data.babyDevelopment}</p>
      </div>
    </div>
  );
};
