'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Breadcrumbs.module.css';

const routeLabels: Record<string, string> = {
  journey: 'Подорож',
  diary: 'Щоденник',
  profile: 'Профіль',
  'my-day': 'Мій день',
};

const HIDE_ON_PATHS = new Set(['/profile/edit']);
const diaryEntryLabel = 'Запис';

const Arrow = () => (
  <svg className={styles.arrow} width='7' height='12' aria-hidden='true'>
    <use href='/sprite.svg#icon-arrow-right'></use>
  </svg>
);

const Breadcrumbs = () => {
  const pathname = usePathname();

  if (!pathname) return null;
  if (HIDE_ON_PATHS.has(pathname)) return null;
  if (pathname.startsWith('/auth')) return null;

  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs = pathname === '/' ? ['my-day'] : pathSegments;
  const isDiaryDetailsPage =
    pathSegments[0] === 'diary' && Boolean(pathSegments[1]);

  const getHref = (segment: string, index: number) => {
    if (pathname === '/') return '/';

    if (segment === 'journey') {
      const weekFromUrl = breadcrumbs[index + 1];
      return weekFromUrl ? `/journey/${weekFromUrl}` : '/journey';
    }

    return `/${breadcrumbs.slice(0, index + 1).join('/')}`;
  };

  const getLabel = (segment: string, isLast: boolean) => {
    if (isLast && isDiaryDetailsPage) return diaryEntryLabel;
    return routeLabels[segment] || segment;
  };

  return (
    <nav aria-label='Breadcrumb' className={`container ${styles.nav}`}>
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link href='/' className={styles.link}>
            Лелека
          </Link>
        </li>

        {breadcrumbs.map((segment, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const href = getHref(segment, index);
          const label = getLabel(segment, isLast);

          return (
            <li key={`${href}-${segment}-${index}`} className={styles.item}>
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
