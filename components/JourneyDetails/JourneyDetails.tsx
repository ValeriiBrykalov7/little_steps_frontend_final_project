'use client';

import { useEffect, useState } from 'react';
import styles from './JourneyDetails.module.css';
import { Loader } from '@/components/Loader/Loader';
// import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard';

// -------- TYPES --------
type JourneyData = {
  baby: {
    image: string;
    textBlocks: string[];
  };
  mother: {
    feelings: string;
    tips: string[];
  };
  tasks: string[];
};

type Props = {
  weekNumber: number;
};

async function fetchJourneyData(weekNumber: number): Promise<JourneyData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        baby: {
          image: '/baby.png',
          textBlocks: [
            `Тиждень ${weekNumber}: малюк активно росте`,
            'Формуються органи та системи',
            'Збільшується рухова активність',
          ],
        },
        mother: {
          feelings: 'Можлива втома, перепади настрою, підвищена чутливість',
          tips: [
            'Більше відпочивайте',
            'Пийте достатньо води',
            'Уникайте стресу',
            'Уникайте стресу',
          ],
        },
        tasks: ['Візит до лікаря', 'Здати аналізи'],
      });
    }, 1000);
  });
}

// -------- COMPONENT --------
export default function JourneyDetails({ weekNumber }: Props) {
  const [activeTab, setActiveTab] = useState<'baby' | 'mother'>('baby');
  const [data, setData] = useState<JourneyData | null>(null);
  const loading = data === null;

  useEffect(() => {
    let isMounted = true;

    fetchJourneyData(weekNumber).then((res) => {
      if (isMounted) {
        setData(res);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [weekNumber, activeTab]);

  return (
    <div className={styles.container}>
      {/* -------- Tabs -------- */}
      <div className={styles.tabs}>
        <button
          onClick={() => setActiveTab('baby')}
          className={`${styles.tab} ${
            activeTab === 'baby' ? styles.active : ''
          }`}
        >
          Розвиток малюка
        </button>

        <button
          onClick={() => setActiveTab('mother')}
          className={`${styles.tab} ${
            activeTab === 'mother' ? styles.active : ''
          }`}
        >
          Тіло мами
        </button>
      </div>

      {/* -------- Loader / Content -------- */}
      {loading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        data && (
          <>
            {/* ---------- BABY ---------- */}
            {activeTab === 'baby' && (
              <div className={styles.cardBig} style={{ position: 'relative' }}>
                <div className={styles.textWrapper}>
                  {data.baby.textBlocks.map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                </div>
              </div>
            )}

            {/* ---------- MOTHER ---------- */}
            {activeTab === 'mother' && (
              <div className={styles.grid}>
                <div className={styles.leftColumn}>
                  <div className={styles.card}>
                    <h3>Як ви можете почуватись</h3>
                    <p>{data.mother.feelings}</p>
                  </div>

                  <div className={styles.card}>
                    <h3>Поради для вашого комфорту</h3>
                    <ul>
                      {data.mother.tips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={styles.rightColumn}>
                  {/* <TasksReminderCard tasks={data.tasks} /> */}
                </div>
              </div>
            )}
          </>
        )
      )}
    </div>
  );
}
