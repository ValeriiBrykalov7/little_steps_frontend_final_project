'use client';

import Logo from '@/components/Logo/Logo';
import '../../css/container.css';
import styles from './layout.module.css';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const authType = params.authType as string;
  let imageSrc = '';

  if (authType === 'login') {
    imageSrc = '/images/nest.jpg';
  } else if (authType === 'register') {
    imageSrc = '/images/storks.jpg';
  } else {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.childrenWrapper}>
          <Logo />
          {children}
        </div>

        <Image
          src={imageSrc}
          width={720}
          height={900}
          alt='storks'
          className={styles.image}
          priority
        />
      </div>
    </main>
  );
}
