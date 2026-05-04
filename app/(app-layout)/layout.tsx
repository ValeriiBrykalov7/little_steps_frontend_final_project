import type { Metadata } from 'next';
import Sidebar from '@/components/Sidebar/Sidebar';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import styles from './layout.module.css';

const title = 'Лелека';
const description =
  'Керуйте завданнями, щоденником, подорожжю вагітності та персональними порадами у додатку Лелека.';
const ogImage = '/images/og-home.jpg';

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  openGraph: {
    title,
    description,
    url: '/',
    siteName: title,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'Лелека - додаток для майбутніх мам',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
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
