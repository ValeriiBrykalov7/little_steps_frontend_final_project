'use client';

import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import styles from './GoogleAuthButton.module.css';

export default function GoogleAuthButton() {
  const router = useRouter();

  return (
    <div className={styles.googleButtonWrapper}>
          <button type='button' className={`${styles.button} gray`}>
               <svg  width='18' height='18' aria-hidden='true'>
    <use href='/sprite.svg#icon-google'></use>
  </svg>
        Увійти через Google
      </button>

      <div className={styles.hiddenGoogleButton}>
        <GoogleLogin
          onSuccess={async credentialResponse => {
            const credential = credentialResponse.credential;

            if (!credential) {
              toast.error('Не отримано Google токен');
              return;
            }

            try {
              await axios.post(
                `${process.env.NEXT_PUBLIC_GOOGLE_AUTH_BACK}/api/auth/google`,
                { credential },
                { withCredentials: true },
              );

              toast.success('Успішна автентифікація через Google');
              router.push('/');
            } catch (error) {
              console.log(error);
              toast.error('Помилка автентифікації через Google');
            }
          }}
          onError={() => {
            toast.error('Помилка входу через Google');
          }}
        />
      </div>
        </div>
        );
}