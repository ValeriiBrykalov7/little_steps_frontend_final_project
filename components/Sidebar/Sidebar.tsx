//app/components/Sidebar/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import css from './Sidebar.module.css';

const navItems = [
  { icon: 'icon-today', name: 'Мій день', path: '/' },
  { icon: 'icon-conversion_path', name: 'Подорож', path: '/journey' },
  { icon: 'icon-book', name: 'Щоденник', path: '/diary' },
  { icon: 'icon-account_circle', name: 'Профіль', path: '/profile' },
];

export default function Sidebar() {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const pathname = usePathname();

  return (
    <nav>
      <ul className={css.list}>
        {navItems.map((item) => {
          const href = isAuth ? item.path : '/auth/login';
          const isActive = pathname === item.path;

          return (
            <li className={css.item} key={item.name}>
              <Link
                href={href}
                className={`${css.link} ${isActive ? css.active : ''}`}
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
  );
}
// /public/images/sprite.svg
// /css/base.css
