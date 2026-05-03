import Logo from '@/components/Logo/Logo';
import '../../css/container.css';
import styles from './layout.module.css';
import ImageAuth from '@/components/ImageAuth/ImageAuth';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Лелека',
    template: '%s | Лелека',
  },
  description:
    'Лелека — додаток для майбутніх мам. Відстежуйте вагітність, отримуйте персоналізовані поради та керуйте важливими завданнями.',
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
