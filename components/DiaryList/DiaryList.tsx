'use client';

import { useRouter } from 'next/navigation';
import type { DiaryEntry } from '@/types/diary';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import css from './DiaryList.module.css';

interface DiaryListProps {
  diaries: DiaryEntry[];
  openAddDiaryEntryModal?: () => void;
}

const DiaryList = ({ diaries, openAddDiaryEntryModal }: DiaryListProps) => {
  const router = useRouter();

  const handleClick = (card: DiaryEntry) => {
    router.push(`/diary/${card._id}`);
  };

  const handleCreateClick = () => {
    if (openAddDiaryEntryModal) {
      openAddDiaryEntryModal();
      return;
    }

    router.push('/diary');
  };

  return (
    <div className={css.diaryListContainer}>
      <div className={css.diaryNavigation}>
        <h2 className={css.diaryNavigationTitle}>Ваші записи</h2>

        <button
          type='button'
          className={css.diaryNavigationButton}
          onClick={handleCreateClick}
        >
          <span className={css.diaryNavigationButtonText}>Новий запис</span>
          <svg
            width='21'
            height='21'
            viewBox='0 0 21 21'
            className={css.diaryNavigationButtonIcon}
          >
            <use href='/sprite.svg#icon-create'></use>
          </svg>
        </button>
      </div>

      <ul className={css.diaryList}>
        {diaries.map((diary) => (
          <DiaryEntryCard
            key={diary._id}
            card={diary}
            onClick={() => handleClick(diary)}
          />
        ))}
      </ul>
    </div>
  );
};

export default DiaryList;
