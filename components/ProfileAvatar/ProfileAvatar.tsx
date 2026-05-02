import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import styles from './ProfileAvatar.module.css';
import { updateAvatar } from '@/lib/api/clientApi'; 
import { useAuthStore } from '@/lib/store/authStore';
import { User } from '@/types/user';


export default function ProfileAvatar() {
    const {user, setUser}=useAuthStore();
    const [preview, setPreview] = useState<string | null>(user?.avatar || null);
    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: async (files) => {
    const file = files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    const data = await updateAvatar(file);
    setUser({ ...user, avatar: data.avatarUrl } as User);
    },
    multiple: false,
    accept: { 'image/*': [] },
    noClick: true,
  });

  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className={styles.wrapper}>

      <div
        {...getRootProps()}
        className={`${styles.circle} ${isDragActive ? styles.active : ''}`}
      >
        <input {...getInputProps()} />
        <Image
          src={preview || user?.avatar || '/images/default-avatar.png' }
          alt="Avatar"
          width={132}
          height={132}
          className={styles.image}
          unoptimized
        />
      </div>

      <div className={styles.info}>
        <h2 className={styles.name}>{user?.username}</h2>
        <p className={styles.email}>{user?.email}</p>
        <button type="button" className={styles.button} onClick={open}>
        Завантажити нове фото
      </button>
      </div>
    </div>
  );
}