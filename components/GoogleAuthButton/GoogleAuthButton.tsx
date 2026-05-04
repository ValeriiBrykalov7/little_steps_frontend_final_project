'use client';

import { useEffect, useRef, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { googleAuth } from '@/lib/api/clientApi';
import styles from './GoogleAuthButton.module.css';

export default function GoogleAuthButton() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [googleButtonWidth, setGoogleButtonWidth] = useState(0);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const syncWidth = () => {
      if (!wrapperRef.current) return;
      setGoogleButtonWidth(Math.floor(wrapperRef.current.offsetWidth));
    };

    syncWidth();

    const observer = new ResizeObserver(syncWidth);
    observer.observe(wrapperRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={styles.googleButtonWrapper}>
      <button type='button' className={`${styles.button} gray`}>
        <svg width='18' height='18' aria-hidden='true'>
          <use href='/sprite.svg#icon-google'></use>
        </svg>
        Увійти через Google
      </button>

      <div className={styles.hiddenGoogleButton}>
        {googleButtonWidth > 0 && (
          <GoogleLogin
            width={googleButtonWidth}
            onSuccess={async (credentialResponse) => {
              const credential = credentialResponse.credential;

              if (!credential) {
                toast.error('Не отримано Google токен');
                return;
              }

              try {
                const user = await googleAuth(credential);

                setUser(user);

                toast.success('Успішна автентифікація через Google');

                router.push('/');
              } catch (error) {
                if (axios.isAxiosError(error)) {
                  console.log('GOOGLE AUTH STATUS:', error.response?.status);
                  console.log('GOOGLE AUTH DATA:', error.response?.data);
                  console.log('GOOGLE AUTH URL:', error.config?.url);

                  toast.error(
                    error.response?.data?.message ||
                      'Помилка автентифікації через Google',
                  );
                  return;
                }

                console.log('UNKNOWN GOOGLE AUTH ERROR:', error);
                toast.error('Невідома помилка');
              }
            }}
            onError={() => {
              toast.error('Помилка входу через Google');
            }}
          />
        )}
      </div>
    </div>
  );
}
