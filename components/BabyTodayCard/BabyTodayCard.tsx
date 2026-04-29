'use client';

import Image from 'next/image';

import css from './BabyTodayCard.module.css';
import { Loader } from '../Loader/Loader';

interface BabyData {
  image: string;
  analogy: string | null;
  size: number;
  weight: number;
  activity: string;
  description: string;
}

interface DataBabyProps {
  dataBaby: BabyData;
}

export const BabyTodayCard = ({ dataBaby }: DataBabyProps) => {
  console.log(dataBaby);

  if (!dataBaby) {
    return <Loader />;
  }

  return (
    <div className={css.card}>
      <h2 className={css['card-title']}>Малюк сьогодні</h2>
      <div className={css['card-subcontainer']}>
        <div className={css['card-img-container']}>
          <Image
            className={css['card-img']}
            src={dataBaby.image}
            alt={dataBaby.analogy || 'Baby illustration'}
            fill
            priority
            style={{ objectFit: 'cover' }}
            sizes='(min-width: 768px) 257px, 100vw'
          />
        </div>

        <div className={css['card-list']}>
          <p className={css['card-text']}>
            <strong className={css['card-text-strong']}>Розмір:</strong>{' '}
            Приблизно {dataBaby.size} см
          </p>
          <p className={css['card-text']}>
            <strong className={css['card-text-strong']}>Вага:</strong> Близько{' '}
            {dataBaby.weight} грамів
          </p>
          <p className={css['card-text']}>
            <strong className={css['card-text-strong']}>Активність:</strong>{' '}
            {dataBaby.activity}
          </p>
        </div>
      </div>
      <p className={css['card-text']}>{dataBaby.description}</p>
    </div>
  );
};
