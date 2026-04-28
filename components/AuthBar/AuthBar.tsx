'use client';

import Link from 'next/link';
import css from './AuthBar.module.css';

type AuthBarProps = {
  onNavigate?: () => void;
};

export default function AuthBar({ onNavigate }: AuthBarProps) {
  return (
    <div className={css.authBar}>
      <div className={css.divider} />
      <Link
        href='/auth/register'
        className={`${css.authButton} ${css.authButtonPrimary}`}
        onClick={() => onNavigate?.()}
      >
        Зареєструватися
      </Link>
      <Link
        href='/auth/login'
        className={`${css.authButton} ${css.authButtonSecondary}`}
        onClick={() => onNavigate?.()}
      >
        Увійти
      </Link>
    </div>
  );
}
