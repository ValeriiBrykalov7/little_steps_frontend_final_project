import { Emotion } from '@/types/emotion';
import styles from './FeelingCheckcard.module.css';

export const FeelingCheckcard = () => {
  const moods: Emotion[] = [];

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Як ви почуваєтесь сьогодні?</h2>
      <p className={styles.desc}>Рекомендація на сьогодні: Занотуйте незвичні відчуття у тілі.</p>
      
      <div className={styles.moodList}>
        {moods.map((mood) => (
          <button key={mood._id} className={styles.moodBtn}>
            {mood.title}
          </button>
        ))}
      </div>

      <button className={styles.diaryBtn}>Зробити запис у щоденник</button>
    </div>
  );
};