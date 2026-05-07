import DiaryPageClient from './DiaryPageClient';
import { createPageMetadata } from '@/lib/helper/metadata';

export const metadata = createPageMetadata({
  title: 'Щоденник',
  description:
    'Ведіть особистий щоденник вагітності, зберігайте записи, емоції та важливі моменти у додатку Лелека.',
  path: '/diary',
  imageAlt: 'Лелека - щоденник вагітності',
});

export default function DiaryListPage() {
  return <DiaryPageClient />;
}
