'use client';

import { Loader } from '../Loader/Loader';
import css from './MomTipCard.module.css';

interface CurrentTipProps {
  currentTip: string;
}

export const MomTipCard = ({ currentTip }: CurrentTipProps) => {
  if (!currentTip) {
    return <Loader />;
  }
  return (
    <div className={css['mom-tip-card']}>
      <h2 className={css['card-title']}>Порада для мами</h2>
      <p className={css['card-text']}>{currentTip}</p>
    </div>
  );
};
