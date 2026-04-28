'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { nextServer } from '@/lib/api/api';
import type { StatusBlockProps } from '@/types/week';
import css from './BabyTodayCard.module.css';
import { Loader } from '../Loader/Loader';

type CurrentWeekProps = Pick<StatusBlockProps, 'currentWeek'>;

export const BabyTodayCard = ({ currentWeek }: CurrentWeekProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['babyToday', currentWeek],
    queryFn: async () => {
      const res = await nextServer.get(`/weeks/baby/${currentWeek}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div>
        <Loader />{' '}
      </div>
    );
  if (isError || !data) return null;

  return (
    <div className={css.card}>
      <h2 className={css['card-title']}>Малюк сьогодні</h2>
      <div className={css['card-subcontainer']}>
        <div className={css['card-img-container']}>
          <Image
            className={css['card-img']}
            src={data.image}
            alt={data.analogy || 'Baby illustration'}
            fill
            priority
            style={{ objectFit: 'cover' }}
            sizes='(min-width: 768px) 257px, 100vw'
          />
        </div>

        <div className={css['card-list']}>
          <p className={css['card-text']}>
            <strong className={css['card-text-strong']}>Розмір:</strong>{' '}
            Приблизно {data.babySize} см
          </p>
          <p className={css['card-text']}>
            <strong className={css['card-text-strong']}>Вага:</strong> Близько{' '}
            {data.babyWeight} грамів
          </p>
          <p className={css['card-text']}>
            <strong className={css['card-text-strong']}>Активність:</strong>{' '}
            {data.babyActivity}
          </p>
        </div>
      </div>
      <p className={css['card-text']}>{data.babyDevelopment}</p>
    </div>
  );
};
