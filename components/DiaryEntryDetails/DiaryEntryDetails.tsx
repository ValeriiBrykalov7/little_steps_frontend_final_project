'use client';

import type { DiaryEntry } from '@/types/diary';
import css from './DiaryEntryDetails.module.css';

type DiaryEntryDetailsProps = {
  entry: DiaryEntry;
  onEdit: () => void;
  onDelete: () => void;
};

const formatDiaryDate = (value: string) =>
  new Date(value)
    .toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .replace('р.', '')
    .trim();

const DiaryEntryDetails = ({ entry, onEdit, onDelete }: DiaryEntryDetailsProps) => {
  const formattedDate = formatDiaryDate(entry.createdAt);
  const emotions = entry.emotions ?? [];

  return (
    <article className={css.card}>
      <header className={css.header}>
        <div className={css.titleRow}>
          <h2 className={css.title}>{entry.title}</h2>
          <button
            type='button'
            className={css.iconButton}
            onClick={onEdit}
            aria-label='Редагувати'
          >
            <svg width='24' height='24'>
              <use href='/sprite.svg#icon-edit_square'></use>
            </svg>
          </button>
        </div>

        <div className={css.metaRow}>
          <p className={css.date}>{formattedDate}</p>
          <button
            type='button'
            className={css.iconButton}
            onClick={onDelete}
            aria-label='Видалити'
          >
            <svg width='24' height='24'>
              <use href='/sprite.svg#icon-delete_forever'></use>
            </svg>
          </button>
        </div>
      </header>

      <p className={css.description}>{entry.description}</p>

      {emotions.length > 0 && (
        <ul className={css.emotionList}>
          {emotions.map((emotion) => (
            <li key={emotion._id} className={css.emotionItem}>
              {emotion.title}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};

export default DiaryEntryDetails;