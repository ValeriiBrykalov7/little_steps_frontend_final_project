'use client';

import { useDropzone } from 'react-dropzone';
import { useFormikContext } from 'formik';
import { FormValues } from '@/components/profile/OnboardingForm/OnboardingForm';
import styles from './PhotoDropzone.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import '../../../css/base.css';
import clsx from 'clsx';

export default function PhotoDropzone() {
  const { setFieldValue, setFieldTouched } = useFormikContext<FormValues>();
  const [preview, setPreview] = useState<string | null>(null);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: (files) => {
      const file = files[0];
      if (!file) return;

      const previewUrl = URL.createObjectURL(file);

      setFieldValue('avatar', file);
      setFieldTouched('avatar', true);

      setPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return previewUrl;
      });
    },
    multiple: false,
    accept: { 'image/*': [] },
    noClick: true,
  });

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className={styles.wrapper}>
      <div
        {...getRootProps()}
        className={clsx(styles.circle, {
          [styles.active]: isDragActive,
        })}
      >
        <input {...getInputProps()} />

        <Image
          src={preview || '/images/default-avatar.png'}
          alt='preview'
          width={164}
          height={164}
          className={styles.image}
          unoptimized
        />
      </div>

      <button type='button' className={`${styles.button} gray`} onClick={open}>
        Завантажити фото
      </button>
    </div>
  );
}
