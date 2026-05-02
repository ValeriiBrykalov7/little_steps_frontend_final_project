'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createTask,
  getBabyWeekInfo,
  getMomWeekInfo,
} from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import type { Baby } from '@/types/baby';
import type { Mom } from '@/types/mom';
import type { CreateTaskRequest } from '@/types/task';
import AddTaskForm from '@/components/AddTaskForm/AddTaskForm';
import { AddTaskModal } from '@/components/AddTaskModal/AddTaskModal';
import { Loader } from '@/components/Loader/Loader';
import TasksReminderCard from '@/components/TaskReminderCard/TaskReminderCard';
import styles from './JourneyDetails.module.css';

type Props = {
  weekNumber: number;
};

type ActiveTab = 'baby' | 'mother';

const COMFORT_TIP_ICON_IDS = ['icon-cutlery', 'icon-weight', 'icon-sofa'];

const splitTextBlocks = (text?: string) =>
  text
    ? text
        .split(/\n+/)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

export default function JourneyDetails({ weekNumber }: Props) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('baby');
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();

  const babyQuery = useQuery<Baby>({
    queryKey: ['journeyDetails', 'baby', weekNumber],
    queryFn: () => getBabyWeekInfo(weekNumber),
    enabled: activeTab === 'baby',
    staleTime: 1000 * 60 * 5,
  });

  const momQuery = useQuery<Mom>({
    queryKey: ['journeyDetails', 'mom', weekNumber],
    queryFn: () => getMomWeekInfo(weekNumber),
    enabled: activeTab === 'mother',
    staleTime: 1000 * 60 * 5,
  });

  const isLoading =
    activeTab === 'baby'
      ? babyQuery.isLoading || babyQuery.isFetching
      : momQuery.isLoading || momQuery.isFetching;

  const hasError = activeTab === 'baby' ? babyQuery.isError : momQuery.isError;

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tasks', isAuthenticated],
      });
    },
  });

  const handleCreateTask = async (task: CreateTaskRequest) => {
    await createTaskMutation.mutateAsync(task);
  };

  const renderBabyTab = () => {
    const baby = babyQuery.data;

    if (!baby) return null;

    const babyDevelopmentBlocks = splitTextBlocks(baby.babyDevelopment);
    const interestingFactBlocks = splitTextBlocks(baby.interestingFact);

    const babyAnalogy = baby.analogy?.trim();
    const babyCaption = babyAnalogy
      ? `Ваш малюк зараз розміром з ${babyAnalogy}`
      : 'Ваш малюк зараз ще на дуже ранньому етапі розвитку';

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

          <p className={styles.babyCaption}>{babyCaption}</p>
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
                <span className={styles.journeyIconBox}>
                  <svg className={styles.journeyIcon}>
                    <use href='/sprite.svg#icon-star'></use>
                  </svg>
                </span>
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
          <div className={styles.motherFeelingCard}>
            <h3 className={styles.infoCardTitle}>Як ви можете почуватись</h3>

            {mom.feelings.states.length > 0 && (
              <ul className={styles.statesChips}>
                {mom.feelings.states.map((state) => (
                  <li className={styles.stateChip} key={state}>
                    {state}
                  </li>
                ))}
              </ul>
            )}

            <p className={styles.motherFeelingText}>
              {mom.feelings.sensationDescr}
            </p>
          </div>

          <div className={styles.comfortCard}>
            <h3 className={styles.infoCardTitle}>Поради для вашого комфорту</h3>
            <ul className={styles.comfortTipsList}>
              {mom.comfortTips.map(({ category, tip }, index) => {
                const iconId =
                  COMFORT_TIP_ICON_IDS[index % COMFORT_TIP_ICON_IDS.length];

                return (
                  <li
                    className={styles.comfortTipItem}
                    key={`${category}-${tip}`}
                  >
                    <div className={styles.comfortTipHeader}>
                      <span
                        className={styles.journeyIconBox}
                        aria-hidden='true'
                      >
                        <svg className={styles.journeyIcon}>
                          <use href={`/sprite.svg#${iconId}`}></use>
                        </svg>
                      </span>
                      <strong className={styles.comfortTipCategory}>
                        {category}
                      </strong>
                    </div>
                    <p className={styles.comfortTipText}>{tip}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className={styles.tasksColumn}>
          <TasksReminderCard
            openAddTaskModal={() => setIsAddTaskModalOpen(true)}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.journeyDetails}>
        <div
          className={`${styles.tabsList} ${
            activeTab === 'mother' ? styles.tabsListMother : ''
          }`}
        >
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

        <div
          key={`${activeTab}-${weekNumber}`}
          className={styles.contentFade}
        >
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
      </div>

      {isAddTaskModalOpen && (
        <AddTaskModal onClose={() => setIsAddTaskModalOpen(false)}>
          {({ close }) => (
            <AddTaskForm onSubmit={handleCreateTask} onClose={close} />
          )}
        </AddTaskModal>
      )}
    </>
  );
}
