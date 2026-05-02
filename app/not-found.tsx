import type { Metadata } from 'next';
import Link from 'next/link';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Not found',
  description: 'This page does not exist',
  openGraph: {
    title: 'Not Found',
    description: 'This page does not exist',
  },
};

export default function NotFound() {
  return (
    <main className={css.notFoundPage}>
      <section className={css.content}>
        <p className={css.code}>404</p>
        <h1 className={css.title}>Сторінку не знайдено</h1>
        <p className={css.text}>
          Можливо, посилання застаріло або сторінку було переміщено.
        </p>

        <Link href='/' className={`pink ${css.homeLink} `}>
          На головну
        </Link>
      </section>
    </main>
  );
}
