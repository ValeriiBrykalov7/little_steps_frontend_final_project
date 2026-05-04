import type { Metadata } from 'next';
import Logo from '@/components/Logo/Logo';
import '../../css/container.css';
import styles from './layout.module.css';
import ImageAuth from '@/components/ImageAuth/ImageAuth';

const title = 'Лелека';
const description =
  'Увійдіть або створіть акаунт у додатку Лелека, щоб відстежувати вагітність, вести щоденник і отримувати персоналізовані поради.';
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
        alt: 'Лелека - авторизація',
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

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.childrenWrapper}>
          <Logo />
          {children}
        </div>
        <ImageAuth />
      </div>
    </main>
  );
}
