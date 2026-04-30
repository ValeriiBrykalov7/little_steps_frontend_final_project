'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { DiaryEntry } from '@/types/diary';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import css from './DiaryList.module.css';

interface DiaryListProps {
  diaries: DiaryEntry[];
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  const router = useRouter();

  const handleClick = (card: DiaryEntry) => {
    router.push(`/diary/${card._id}`);
  };

  //Це буде не link а кнопка, яка буде відкривавати модалку, теж треба буде cтворити пропс
  //openAddDiaryEntryModal який буде приймати функцію для відкриття модалки і обробник при натисканні на кнопку. А у page для кнопки треба буде зробити стан для
  //відкриття і закриття модалки

  return (
    <div className={css.diaryListContainer}>
      <div className={css.diaryNavigation}>
        <h2 className={css.diaryNavigationTitle}>Ваші записи</h2>

        <Link href='/diary' className={css.diaryNavigationButton}>
          <span className={css.diaryNavigationButtonText}>Новий запис</span>
          <svg
            width='21'
            height='21'
            viewBox='0 0 21 21'
            className={css.diaryNavigationButtonIcon}
          >
            <use href='/sprite.svg#icon-create'></use>
          </svg>
        </Link>
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
