//app/components/Sidebar/Sidebar.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AuthBar from '@/components/AuthBar/AuthBar';
import UserBar from '@/components/UserBar/UserBar';
import Header from '@/components/Header/Header';
import Logo from '@/components/Logo/Logo';
import { useAuthStore } from '@/lib/store/authStore';
import css from './Sidebar.module.css';

const navItems = [
  { icon: 'icon-today', name: 'Мій день', path: '/' },
  { icon: 'icon-conversion_path', name: 'Подорож', path: '/journey' },
  { icon: 'icon-book', name: 'Щоденник', path: '/diary' },
  { icon: 'icon-account_circle', name: 'Профіль', path: '/profile' },
];

type SidebarContentProps = {
  onNavigate?: () => void;
  showLogo?: boolean;
};

const SidebarContent = ({
  onNavigate,
  showLogo = true,
}: SidebarContentProps) => {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const isAuthChecked = useAuthStore((state) => state.isAuthChecked);
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();

  return (
    <div className={css.sidebarInner}>
      {showLogo && <div className={css.logoContainer}><Logo /></div>}
      <nav className={css.nav}>
        <ul className={css.list}>
          {navItems.map((item) => {
            const href = isAuth ? item.path : '/auth/login';
            const isActive = pathname === item.path;

            return (
              <li className={css.item} key={item.name}>
                <Link
                  href={href}
                  className={`${css.link} ${isActive ? css.active : ''}`}
                  onClick={() => onNavigate?.()}
                >
                  <svg className={css.icon}>
                    <use href={`/sprite.svg#${item.icon}`} />
                  </svg>

                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {isAuthChecked && isAuth && user ? (
        <UserBar onNavigate={onNavigate} />
      ) : (
        <AuthBar onNavigate={onNavigate} />
      )}
    </div>
  );
};

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <Header
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen((current) => !current)}
      />

      <aside className={css.desktopSidebar}>
        <SidebarContent />
      </aside>

      <div
        className={`${css.backdrop} ${isMenuOpen ? css.backdropOpen : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <aside
        id='app-mobile-sidebar'
        className={`${css.mobileSidebar} ${
          isMenuOpen ? css.mobileSidebarOpen : ''
        }`}
        aria-hidden={!isMenuOpen}
      >
        <SidebarContent
          showLogo={false}
          onNavigate={() => setIsMenuOpen(false)}
        />
      </aside>
    </>
  );
}
