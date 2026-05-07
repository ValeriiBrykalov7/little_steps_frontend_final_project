'use client';

import Logo from '@/components/common/Logo/Logo';
import css from './Header.module.css';

type HeaderProps = {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
};

export default function Header({ isMenuOpen, onMenuToggle }: HeaderProps) {
  return (
    <header className={css.header}>
      <Logo />
      <button
        type='button'
        className={`${css.menuButton} ${isMenuOpen ? css.menuButtonOpen : ''}`}
        aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
        aria-expanded={isMenuOpen}
        aria-controls='app-mobile-sidebar'
        onClick={onMenuToggle}
      >
        <span className={css.menuLine} />
        <span className={css.menuLine} />
        <span className={css.menuLine} />
      </button>
    </header>
  );
}
