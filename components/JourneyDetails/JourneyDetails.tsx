'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBabyWeekInfo, getMomWeekInfo } from '@/lib/api/clientApi';
import type { Baby } from '@/types/baby';
import type { Mom } from '@/types/mom';
import { Loader } from '@/components/Loader/Loader';
import TasksReminderCard from '@/components/TaskReminderCard/TaskReminderCard';
import styles from './JourneyDetails.module.css';

type Props = {
  weekNumber: number;
};

type ActiveTab = 'baby' | 'mother';

const STALE_TIME = 1000 * 60 * 5;

const splitTextBlocks = (text?: string) =>
  text
    ? text
        .split(/\n+/)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

export default function JourneyDetails({ weekNumber }: Props) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('baby');

  const babyQuery = useQuery<Baby>({
    queryKey: ['journeyDetails', 'baby', weekNumber],
    queryFn: () => getBabyWeekInfo(weekNumber),
    enabled: activeTab === 'baby',
    staleTime: STALE_TIME,
  });

  const momQuery = useQuery<Mom>({
    queryKey: ['journeyDetails', 'mom', weekNumber],
    queryFn: () => getMomWeekInfo(weekNumber),
    enabled: activeTab === 'mother',
    staleTime: STALE_TIME,
  });

  const isLoading =
    activeTab === 'baby'
      ? babyQuery.isLoading || babyQuery.isFetching
      : momQuery.isLoading || momQuery.isFetching;

  const hasError = activeTab === 'baby' ? babyQuery.isError : momQuery.isError;

  const renderBabyTab = () => {
    const baby = babyQuery.data;

    if (!baby) return null;

    const babyDevelopmentBlocks = splitTextBlocks(baby.babyDevelopment);
    const interestingFactBlocks = splitTextBlocks(baby.interestingFact);

    return (
      <div className={styles.babyCard}>
        <div className={styles.babyVisualColumn}>
          {baby.image && (
            <div className={styles.babyImageFrame}>
              <Image
                className={styles.babyImage}
                src={baby.image}
                alt={
                  baby.analogy ||
                  `Ілюстрація розвитку малюка на ${weekNumber} тижні`
                }
                width={640}
                height={360}
                priority
              />
            </div>
          )}

          {baby.analogy && (
            <p className={styles.babyCaption}>
              Ваш малюк зараз розміром з {baby.analogy}
            </p>
          )}
        </div>

        <div className={styles.babyContentColumn}>
          <div className={styles.babyTextList}>
            {babyDevelopmentBlocks.map((text, index) => (
              <p key={`${text}-${index}`}>{text}</p>
            ))}
          </div>

          {interestingFactBlocks.length > 0 && (
            <div className={styles.factCard}>
              <div className={styles.factTitleRow}>
                <svg
                  className={styles.factIcon}
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    d='M12 2.5l1.55 5.23 4.95-2.31-2.31 4.95L21.5 12l-5.31 1.63 2.31 4.95-4.95-2.31L12 21.5l-1.55-5.23-4.95 2.31 2.31-4.95L2.5 12l5.31-1.63L5.5 5.42l4.95 2.31L12 2.5z'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='1.8'
                  />
                </svg>
                <h3 className={styles.factTitle}>Цікавий факт тижня</h3>
              </div>

              <div className={styles.factText}>
                {interestingFactBlocks.map((text, index) => (
                  <p key={`${text}-${index}`}>{text}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMotherTab = () => {
    const mom = momQuery.data;

    if (!mom) return null;

    return (
      <div className={styles.motherGrid}>
        <div className={styles.motherContent}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoCardTitle}>Як ви можете почуватись</h3>
            <p>{mom.feelings.sensationDescr}</p>

            {mom.feelings.states.length > 0 && (
              <ul className={styles.statesList}>
                {mom.feelings.states.map((state) => (
                  <li className={styles.tipsItem} key={state}>
                    {state}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoCardTitle}>Поради для вашого комфорту</h3>
            <ul className={styles.tipsList}>
              {mom.comfortTips.map(({ category, tip }) => (
                <li className={styles.tipsItem} key={`${category}-${tip}`}>
                  <strong>{category}: </strong>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.tasksColumn}>
          <TasksReminderCard />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.journeyDetails}>
      <div className={styles.tabsList}>
        <button
          type='button'
          onClick={() => setActiveTab('baby')}
          className={`${styles.tabButton} ${
            activeTab === 'baby' ? styles.tabButtonActive : ''
          }`}
        >
          Розвиток малюка
        </button>

        <button
          type='button'
          onClick={() => setActiveTab('mother')}
          className={`${styles.tabButton} ${
            activeTab === 'mother' ? styles.tabButtonActive : ''
          }`}
        >
          Тіло мами
        </button>
      </div>

      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : hasError ? (
        <p className={styles.errorText}>Не вдалося завантажити дані тижня.</p>
      ) : activeTab === 'baby' ? (
        renderBabyTab()
      ) : (
        renderMotherTab()
      )}
    </div>
  );
}
