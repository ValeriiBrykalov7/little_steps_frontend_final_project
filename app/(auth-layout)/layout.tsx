import type { Metadata } from 'next';
import Logo from '@/components/Logo/Logo';
import { createPageMetadata, SITE_NAME } from '@/lib/helper/metadata';
import '../../css/container.css';
import styles from './layout.module.css';
import ImageAuth from '@/components/ImageAuth/ImageAuth';

export const metadata: Metadata = {
  ...createPageMetadata({
    title: SITE_NAME,
    description:
      'Увійдіть або створіть акаунт у додатку Лелека, щоб відстежувати вагітність, вести щоденник і отримувати персоналізовані поради.',
    path: '/auth/login',
    imageAlt: 'Лелека - авторизація',
    absoluteTitle: true,
  }),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
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
