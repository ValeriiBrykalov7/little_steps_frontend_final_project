'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import css from './UserBar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';
import { useState } from 'react';

type UserBarProps = {
  onNavigate?: () => void;
};

export default function UserBar({ onNavigate }: UserBarProps) {
  const user = useAuthStore((state) => state.user);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const [isConfirmationModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearIsAuthenticated();
      onNavigate?.();
      router.push('/auth/login');
    }
  };

  return (
    <>
      <div className={css.userBar}>
        <div className={css.divider} />
        <div className={css.userRow}>
          <Link
            href='/profile'
            className={css.userInfo}
            onClick={() => onNavigate?.()}
          >
            <div className={css.userInfo}>
              <div className={css.avatar}>
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.username}
                    className={css.avatarImage}
                    width={40}
                    height={40}
                  />
                ) : (
                  (user.username?.[0]?.toUpperCase() ?? 'User')
                )}
              </div>
              <div className={css.userText}>
                <p className={css.userName}>{user.username}</p>
                <p className={css.userEmail}>{user.email}</p>
              </div>
            </div>
          </Link>
          <button
            type='button'
            className={css.logoutButton}
            onClick={() => setIsModalOpen(true)}
            aria-label='Вийти'
            title='Вийти'
          >
            <svg className={css.logoutIcon}>
              <use href='/sprite.svg#icon-logout' />
            </svg>
          </button>
        </div>
      </div>
      {isConfirmationModalOpen && (
        <ConfirmationModal
          title='Ви впевнені, що хочете вийти?'
          confirmButtonText='Так'
          cancelButtonText='Ні'
          onConfirm={handleLogout}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
