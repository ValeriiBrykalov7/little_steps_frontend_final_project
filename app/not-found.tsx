import Link from 'next/link';
import { createPageMetadata } from '@/lib/helper/metadata';
import css from './not-found.module.css';

export const metadata = createPageMetadata({
  title: 'Сторінку не знайдено',
  description:
    'На жаль, такої сторінки не існує. Перейдіть на головну сторінку Лелека.',
  path: '/404',
  imageAlt: 'Лелека - сторінку не знайдено',
});

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
