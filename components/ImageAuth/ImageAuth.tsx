'use client';

import { notFound, useParams, usePathname } from 'next/navigation';
import styles from './ImageAuth.module.css';
import Image from 'next/image';

export default function ImageAuth() {
  const { authType } = useParams();
  const pathname = usePathname();

  let imageSrc = '';
  let alt = '';

  if (authType === 'login') {
    imageSrc = '/images/nest.jpg';
    alt = 'Nest';
  } else if (authType === 'register') {
    imageSrc = '/images/storks.jpg';
    alt = 'Storks';
  } else if (authType === 'forgot-password') {
    imageSrc = '/images/plant.jpg';
    alt = 'Forgot Password';
  } else if (pathname === '/profile/edit') {
    imageSrc = '/images/plant.jpg';
    alt = 'Plant';
  } else {
    notFound();
  }

  return (
    <Image
      src={imageSrc}
      className={styles.image}
      width={720}
      height={900}
      alt={alt}
      priority
    />
  );
}
