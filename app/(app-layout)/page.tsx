import DashboardPageClient from './DashboardPageClient';
import { createPageMetadata, SITE_NAME } from '@/lib/helper/metadata';

export const metadata = createPageMetadata({
  title: SITE_NAME,
  description:
    'Лелека - додаток для майбутніх мам: відстежуйте вагітність, отримуйте персоналізовані поради, ведіть щоденник і керуйте важливими завданнями.',
  path: '/',
  imageAlt: 'Лелека - додаток для майбутніх мам',
  absoluteTitle: true,
});

export default function DashboardPage() {
  return <DashboardPageClient />;
}
