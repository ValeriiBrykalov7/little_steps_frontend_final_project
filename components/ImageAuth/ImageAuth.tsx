'use client';

import { notFound, useParams } from 'next/navigation';
import styles from './ImageAuth.module.css';
import Image from 'next/image';

export default function ImageAuth() {
  const { authType } = useParams();
  let imageSrc = '';

  if (authType === 'login') {
    imageSrc = '/images/nest.jpg';
  } else if (authType === 'register') {
    imageSrc = '/images/storks.jpg';
  } else if (authType === 'profile/edit') {
    imageSrc = '/images/plant.jpg';
  } else {
    notFound();
  }

  return (
    <Image
      src={imageSrc}
      className={styles.image}
      width={720}
      height={900}
      alt={authType}
      priority
    />
  );
}
