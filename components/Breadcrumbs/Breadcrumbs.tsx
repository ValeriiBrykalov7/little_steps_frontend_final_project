'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './Breadcrumbs.module.css';
import { getAllDiary } from '@/lib/api/clientApi';


const routeLabels: Record<string, string> = {
  journey: 'Подорож',
  diary: 'Щоденник',
  profile: 'Профіль',
  'my-day': 'Мій день',
};

const HIDE_ON_PATHS = new Set(['/profile/edit']);

const Arrow = () => (
  <svg className={styles.arrow} width="7" height="12" aria-hidden="true">
    <use href="/sprite.svg#icon-arrow-right"></use>
  </svg>
);

const getBreadcrumbHref = (node: string, index: number, nodes: string[]) => {
  if (node === 'journey') {
    const weekFromUrl = nodes[index + 1];
    return weekFromUrl ? `/journey/${weekFromUrl}` : '/journey';
  }

  return `/${nodes.slice(0, index + 1).join('/')}`;
};

const Breadcrumbs = () => {
  const pathname = usePathname();

  const pathNodes = pathname?.split('/').filter(Boolean) ?? [];
  const nodesForRender = pathname === '/' ? ['my-day'] : pathNodes;

  const isDiaryDetailsPage = pathNodes[0] === 'diary' && Boolean(pathNodes[1]);
  const diaryEntryId = isDiaryDetailsPage ? pathNodes[1] : null;

  const { data: diaryEntries } = useQuery({
    queryKey: ['diary-entries'],
    queryFn: getAllDiary,
    enabled: isDiaryDetailsPage,
  });

  const diaryEntry = diaryEntries?.find(entry => entry._id === diaryEntryId);

  if (!pathname) return null;
  if (HIDE_ON_PATHS.has(pathname)) return null;
  if (pathname.startsWith('/auth')) return null;

  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link href="/" className={styles.link}>
            Лелека
          </Link>
        </li>

        {nodesForRender.map((node, index) => {
          const isLast = index === nodesForRender.length - 1;

          const href =
            pathname === '/'
              ? '/'
              : getBreadcrumbHref(node, index, nodesForRender);

          const label =
            isLast && diaryEntry?.title
              ? diaryEntry.title
              : routeLabels[node] || node;

          return (
            <li key={`${href}-${node}-${index}`} className={styles.item}>
              <Arrow />

              {isLast ? (
                <span className={styles.current}>{label}</span>
              ) : (
                <Link href={href} className={styles.link}>
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;