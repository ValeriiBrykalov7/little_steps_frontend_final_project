import { DiaryEntry } from '@/types/diary';
import styles from './DiaryEntryDetails.module.css';

interface DiaryEntryProps {
  entry: DiaryEntry;
}

export const DiaryEntryDetails = ({ entry }: DiaryEntryProps) => {
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <h3>{entry.title}</h3>
        {}
        <span>{entry.date || new Date(entry.createdAt).toLocaleDateString()}</span>
      </header>
      
      {}
      <p className={styles.text}>{entry.description}</p>
      
      <div className={styles.actions}>
        <button>Редагувати</button>
        <button className={styles.deleteBtn}>Видалити</button>
      </div>
    </div>
  );
};