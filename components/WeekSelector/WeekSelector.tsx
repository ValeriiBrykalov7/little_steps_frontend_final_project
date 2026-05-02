'use client';

import { useLayoutEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  FIRST_WEEK,
  LAST_WEEK,
  getActiveWeek,
  optimizeWeek,
} from '@/lib/helper/week';
import css from './WeekSelector.module.css';

type Props = {
  currentWeek: number;
  selectedWeek?: number;
};

export const WeekSelector = ({
  currentWeek: currentWeekFromServer,
  selectedWeek,
}: Props) => {
  const router = useRouter();
  const weekRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const currentWeek = optimizeWeek(currentWeekFromServer);
  const activeWeek = getActiveWeek(currentWeekFromServer, selectedWeek);

  useLayoutEffect(() => {
    weekRefs.current[activeWeek]?.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: activeWeek === FIRST_WEEK ? 'start' : 'center',
    });
  }, [activeWeek]);

  const handleWeekClick = (week: number) => {
    if (week === activeWeek) return;

    router.push(`/journey/${week}`);
  };

  return (
    <div className={css.weekSelectorViewport}>
      <div className={css.weekSelector}>
        {Array.from({ length: LAST_WEEK }, (_, index) => {
          const week = index + 1;
          const isFuture = week > currentWeek;
          const isActive = week === activeWeek && !isFuture;

          return (
            <button
              key={week}
              ref={(element) => {
                weekRefs.current[week] = element;
              }}
              type='button'
              className={`${css.weekbox} ${
                isFuture ? css.future : isActive ? css.active : css.lastActive
              }`}
              disabled={isFuture}
              onClick={() => handleWeekClick(week)}
            >
              <span className={css.text}>
                <span className={css.weekNumber}>{week}</span> Тиждень
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
