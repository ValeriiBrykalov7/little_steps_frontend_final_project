'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import css from './WeekSelector.module.css';

type Props = {
  currentWeek: number;
  selectedWeek?: number;
};

const FIRST_WEEK = 1;
const LAST_WEEK = 40;

const clampWeek = (week: number) => {
  if (!Number.isFinite(week)) return FIRST_WEEK;
  return Math.min(Math.max(week, FIRST_WEEK), LAST_WEEK);
};

export const WeekSelector = ({ currentWeek, selectedWeek }: Props) => {
  const router = useRouter();
  const weekRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  const availableWeek = useMemo(() => clampWeek(currentWeek), [currentWeek]);
  const selectedWeekFromProps = useMemo(
    () => Math.min(clampWeek(selectedWeek ?? availableWeek), availableWeek),
    [availableWeek, selectedWeek],
  );

  const activeWeek = selectedWeekFromProps;

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
          const isFuture = week > availableWeek;
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
