import Image from 'next/image';

import css from './BabyTodayCard.module.css';

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

{
  //  <div className={`container ${css.status_block}`}>
  // {`container ${css.card}`};
  // <div className={css.card}></div>
}

export const BabyTodayCard = ({ dataBaby }: DataBabyProps) => {
  return (
    <div className={css.container_card}>
      <div className={css.card}>
        <h2 className={css.cardTitle}>Малюк сьогодні</h2>
        <div className={css.cardSubcontainer}>
          <div className={css.cardImgContainer}>
            <Image
              className={css.cardImg}
              src={dataBaby.image}
              alt={dataBaby.analogy || 'Baby illustration'}
              fill
              priority
              style={{ objectFit: 'cover' }}
              sizes='(min-width: 768px) 257px, 100vw'
            />
          </div>

          <div className={css.cardList}>
            <p className={css.cardText}>
              <strong className={css['card-text-strong']}>Розмір:</strong>{' '}
              Приблизно {dataBaby.size} см
            </p>
            <p className={css.cardText}>
              <strong className={css.cardTextStrong}>Вага:</strong> Близько{' '}
              {dataBaby.weight} грамів
            </p>
            <p className={css.cardText}>
              <strong className={css['card-text-strong']}>Активність:</strong>{' '}
              {dataBaby.activity}
            </p>
          </div>
        </div>
        <p className={css.cardText}>{dataBaby.description}</p>
      </div>
    </div>
  );
};
