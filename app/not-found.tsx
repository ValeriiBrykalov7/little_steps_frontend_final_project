import type { Metadata } from 'next';
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
  return <h1>Сторінку не знайдено.</h1>;
}
