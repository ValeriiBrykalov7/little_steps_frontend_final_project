'use client';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import styles from './FeelingCheckcard.module.css';

type FeelingCheckcardProps = {
  openAddDiaryEntryModal: () => void;
};

export default function FeelingCheckcard({
  openAddDiaryEntryModal,
}: FeelingCheckcardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handleDiaryClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
    } else {
      openAddDiaryEntryModal();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h3>Як ви себе почуваєте?</h3>
        <div className={styles.noDiary}>
          <h4>Рекомендація на сьогодні:</h4>
          <p>Занотуйте незвичні відчуття у тілі.</p>
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
