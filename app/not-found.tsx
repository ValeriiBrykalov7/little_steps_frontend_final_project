import type { Metadata } from 'next';
import Link from 'next/link';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Сторінку не знайдено',

  description:
    'На жаль, такої сторінки не існує. Перейдіть на головну сторінку Лелека.',

  openGraph: {
    title: '404 — Сторінку не знайдено | Лелека',
    description:
      'На жаль, такої сторінки не існує. Перейдіть на головну сторінку.',
    url: 'https://little-steps-kappa.vercel.app/',
    siteName: 'Лелека',
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Лелека — сторінку не знайдено',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: '404 - Сторінку не знайдено | Лелека',
    description:
      'На жаль, такої сторінки не існує. Перейдіть на головну сторінку.',
    images: ['/images/og-home.jpg'],
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
