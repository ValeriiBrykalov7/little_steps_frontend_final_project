//app/components/Sidebar/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Sidebar.module.css';

type SidebarProps = {
  isAuth: boolean;
};

const navItems = [
  { name: 'Мій день', path: '/' },
  { name: 'Подорож', path: '/journey' },
  { name: 'Щоденник', path: '/diary' },
  { name: 'Профіль', path: '/profile' },
];

export default function Sidebar({ isAuth }: SidebarProps) {
  const pathname = usePathname();

  return (
    <nav>
      <ul className={css.list}>
        {navItems.map((item) => {
          const href = isAuth ? item.path : '/auth/login';
          const isActiv = pathname === item.path;

          return (
            <li key={item.name}>
              <Link
                href={href}
                className={`${css.link} ${isActive ? css.active : ''}`}
              >
                <span className={css.icon}></span>
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
