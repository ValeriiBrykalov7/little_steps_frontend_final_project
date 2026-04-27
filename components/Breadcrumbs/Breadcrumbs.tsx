"use client";
import styles from './Breadcrumbs.module.css';



const routeLabels: Record<string, string> = {
  journey: 'Подорож',
  diary: 'Щоденник',
  profile: 'Профіль',
  'my-day': 'Мій день',
};


const Arrow = () => (
  <svg className={styles.arrow} width="7" height="12">
    <use href="/sprite.svg#icon-arrow-right"></use>
  </svg>
);

const HIDE_ON_PATHS = new Set(['/profile/edit']);


const getBreadcrumbHref = (node: string, index: number, nodes: string[]) => {
  if (node === 'journey') {
    const weekFromUrl = nodes[index + 1];
    return weekFromUrl ? `/journey/${weekFromUrl}` : '/journey';
  }

  return `/${nodes.slice(0, index + 1).join('/')}`;
};
