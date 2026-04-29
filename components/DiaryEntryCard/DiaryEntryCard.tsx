import type { DiaryEntry } from '@/types/diary';
import css from './DiaryEntryCard.module.css';

type DiaryEntryCardProps = {
  card: DiaryEntry;
  isActive?: boolean;
  onClick: () => void;
};

const DiaryEntryCard = ({
  card,
  isActive = false,
  onClick,
}: DiaryEntryCardProps) => {
  const formattedDate = new Date(card.createdAt)
    .toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .replace('р.', '');

  return (
    <li className={css.diaryListItem}>
      <button
        type='button'
        className={`${css.diaryButton} ${
          isActive ? css.diaryButtonActive : ''
        }`}
        aria-current={isActive ? 'true' : undefined}
        onClick={onClick}
      >
        <div className={css.headerCard}>
          <p className={css.cardTitle}>{card.title}</p>
          <p className={css.dateInfo}>{formattedDate}</p>
        </div>

        {card.emotions?.length > 0 && (
          <ul className={css.emotionList}>
            {card.emotions.map((emotion) => (
              <li key={emotion._id} className={css.emotionListItem}>
                {emotion.title}
              </li>
            ))}
          </ul>
        )}
      </button>
    </li>
  );
};

export default DiaryEntryCard;
