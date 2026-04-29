
import { DiaryEntry } from '@/types/diary';
import css from './DiaryEntryCard.module.css';

type DiaryEntryCardProps = {
  card: DiaryEntry;
  onClick: () => void;
};

const DiaryEntryCard = ({card, onClick }:DiaryEntryCardProps) => {
  return (
    <li onClick={onClick} className={css.diaryListItem}>
      <div className={css.headerCard}>
        <p className={css.cardTitle}>{card.title}</p>
        <p className={css.dateInfo}>
          {new Date(card.createdAt).toLocaleDateString("uk-UA", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).replace("р.","")}
        </p>
      </div>
      <ul className={css.emotionList}>
        {card.emotions?.map((emotion) => (
          <li key={emotion._id} className={css.emotionListItem}>{emotion.title}</li>
        ))}
      </ul>
    </li>
  );
};
export default DiaryEntryCard;
