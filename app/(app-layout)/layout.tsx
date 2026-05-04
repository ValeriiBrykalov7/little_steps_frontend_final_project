import Sidebar from '@/components/Sidebar/Sidebar';
import styles from './layout.module.css';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Лелека',
    template: '%s | Лелека',
  },

  description: 'Керування завданнями та щоденником у додатку Лелека.',

  openGraph: {
    title: 'Лелека',
    description: 'Завдання, щоденник та події.',
    url: 'https://little-steps-kappa.vercel.app/',
    siteName: 'Лелека',
    images: [
      {
        url: '/images/meta-card.jpg',
        width: 1200,
        height: 630,
        alt: 'Лелека',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
};

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <main className={`${styles.content}`}>
        <div className={`${styles.breadcrumbs}`}>
          <Breadcrumbs />
        </div>
        {children}
      </main>
    </div>
  );
}
