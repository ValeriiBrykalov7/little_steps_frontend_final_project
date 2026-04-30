'use client';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import styles from './FeelingCheckcard.module.css';

type FeelingCheckcardProps = {
  openAddTaskModal: () => void;
};

export default function FeelingCheckcard({
  openAddTaskModal,
}: FeelingCheckcardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handleDiaryClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
    } else {
      openAddTaskModal();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.contentText}>Як ви себе почуваєте?</h3>
        <div className={styles.noDiary}>
          <h4 className={styles.noDiaryTitle}>Рекомендація на сьогодні:</h4>
          <p className={styles.noDiaryText}>Занотуйте незвичні відчуття у тілі.</p>
        </div>
      </div>
      <button
        type='button'
        className={`pink ${styles.createDiaryButton}`}
        onClick={handleDiaryClick}
      >
        Зробити запис у щоденник
      </button>
    </div>
  );
}
