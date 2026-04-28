'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import css from './UserBar.module.css';

type UserBarProps = {
  onNavigate?: () => void;
};

export default function UserBar({ onNavigate }: UserBarProps) {
  const user = useAuthStore((state) => state.user);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const router = useRouter();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      clearIsAuthenticated();
      onNavigate?.();
      router.push('/auth/login');
    }
  };

  return (
    <div className={css.userBar}>
      <div className={css.divider} />
      <div className={css.userRow}>
        <div className={css.userInfo}>
          <div className={css.avatar}>
            {user.avatar ? (
              <img src={user.avatar} alt={user.username} className={css.avatarImage} />
            ) : (
              user.username?.[0]?.toUpperCase() ?? 'U'
            )}
          </div>
          <div className={css.userText}>
            <p className={css.userName}>{user.username}</p>
            <p className={css.userEmail}>{user.email}</p>
          </div>
        </div>
        <button
          type='button'
          className={css.logoutButton}
          onClick={handleLogout}
          aria-label='Вийти'
          title='Вийти'
        >
          <svg className={css.logoutIcon}>
            <use href='/sprite.svg#icon-logout' />
          </svg>
        </button>
      </div>
    </div>
  );
}
