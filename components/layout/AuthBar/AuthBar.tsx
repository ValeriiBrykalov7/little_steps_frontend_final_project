'use client';

import { useRouter } from 'next/navigation';
import css from './AuthBar.module.css';

type AuthBarProps = {
  onNavigate?: () => void;
};

export default function AuthBar({ onNavigate }: AuthBarProps) {
  const router = useRouter();

  return (
    <div className={css.authBar}>
      <div className={css.divider} />
      <button
        type='button'
        className={`${css.authButton} pink`}
        onClick={() => {
          onNavigate?.();
          router.push('/auth/register');
        }}
      >
        Зареєструватися
      </button>
      <button
        type='button'
        className={`${css.authButton} gray`}
        onClick={() => {
          onNavigate?.();
          router.push('/auth/login');
        }}
      >
        Увійти
      </button>
    </div>
  );
}
