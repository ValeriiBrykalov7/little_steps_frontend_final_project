import type { Metadata } from 'next';
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
        url: '/images/meta-card.jpg',
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
    images: ['/images/meta-card.jpg'],
  },
};

export default function NotFound() {
  return <h1>Сторінку не знайдено.</h1>;
}
