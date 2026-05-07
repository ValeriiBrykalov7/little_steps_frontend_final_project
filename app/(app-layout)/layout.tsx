import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar/Sidebar';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { createPageMetadata, SITE_NAME } from '@/lib/helper/metadata';
import styles from './layout.module.css';

export const metadata: Metadata = {
  ...createPageMetadata({
    title: SITE_NAME,
    description:
      'Керуйте завданнями, щоденником, подорожжю вагітності та персональними порадами у додатку Лелека.',
    path: '/',
    imageAlt: 'Лелека - додаток для майбутніх мам',
    absoluteTitle: true,
  }),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
};

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <main className={`container ${styles.content}`}>
        <div className='container'>
          <Breadcrumbs />
        </div>
        {children}
      </main>
    </div>
  );
}
