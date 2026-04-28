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
      <button onClick={handleDiaryClick}>Зробити запис у щоденник</button>
    </div>
  );
}