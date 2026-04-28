"use client";
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import styles from './FeelingCheckcard.module.css';

export default function FeelingCheckcard({ openAddDiaryEntryModal }: { openAddDiaryEntryModal: () => void }) {
  const router = useRouter();
const { isAuthenticated } = useAuthStore();

  const handleDiaryClick = () => {
    if (!isAuthenticated) {
      router.push('/app/(public routes)/auth/register');
    } else {
      openAddDiaryEntryModal();
    }
  };

  return (
    <div className={styles.card}>
      <h3>Як ви себе почуваєте?</h3>
      <div className={styles.noDiary}>
            <h4>Рекомендація на сьогодні:</h4>
            <p>Занотуйте незвичні відчуття у тілі.</p>
        </div>
      <button className={styles.createDiaryButton} onClick={handleDiaryClick}>Зробити запис у щоденник</button>
    </div>
  );
}