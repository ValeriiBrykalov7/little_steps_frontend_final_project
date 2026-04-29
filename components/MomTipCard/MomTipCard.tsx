import css from './MomTipCard.module.css';

interface CurrentTipProps {
  currentTip: string;
}

export const MomTipCard = ({ currentTip }: CurrentTipProps) => {
  return (
    <div className={css.momTipCard}>
      <h2 className={css.cardTitle}>Порада для мами</h2>
      <p className={css.cardText}>{currentTip}</p>
    </div>
  );
};
