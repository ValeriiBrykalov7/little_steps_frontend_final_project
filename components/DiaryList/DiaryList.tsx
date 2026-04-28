import css from './DiaryList.module.css';
import type { DiaryEntry } from '@/types/diary';
import Link from 'next/link';
interface DiaryListProps {
  diaries: DiaryEntry[];
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  return (
    <div className={css.diaryListContainer}>
      <div className={css.diaryNavigation}>
        <h2 className={css.diaryNavigationTitle}>Ваші записи</h2>
        //TODO - добавити справжній шлях до створення запису
        <Link href='/diary/action/create' className={css.diaryNavigationButton}>
          <span className={css.diaryNavigationButtonText}>Новий запис</span>
          <svg width="21" height="21" viewBox="0 0 21 21" className={css.diaryNavigationButtonIcon}>
            <use href='/sprite.svg#icon-create'></use>
          </svg>
        </Link>
      </div>
      <ul className={css.diaryList}>
        {diaries.map((diary) => (
          //TODO - добавити справжній компонент сюди
          <li className={css.diaryEntry} key={diary._id}>
            <h3 className={css.diaryEntryTitle}>{diary.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default DiaryList;
