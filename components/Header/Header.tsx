'use client';

import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dialogId = useId();

  useEffect(() => {
    if (!isMenuOpen) return;

    const onEscPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', onEscPress);
    return () => window.removeEventListener('keydown', onEscPress);
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.row}>
          <Link href='/' className={styles.logoLink} aria-label='Go to My Day page'>
            <img
              src='/images/logo.png'
              alt='Leleka logo'
              width={84}
              height={36}
              className={styles.logoImageClosed}
            />
          </Link>

          <button
            type='button'
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(true)}
            aria-label='Open burger menu'
            aria-expanded={isMenuOpen}
            aria-controls={dialogId}
          >
            <svg width='32' height='32' aria-hidden='true'>
              <use href='/sprite.svg#icon-menu' />
            </svg>
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className={styles.backdrop}
          role='dialog'
          aria-modal='true'
          id={dialogId}
          onClick={() => setIsMenuOpen(false)}
        >
          <div className={styles.menuPanel} onClick={(event) => event.stopPropagation()}>
            <div className={styles.menuTop}>
              <button
                type='button'
                className={styles.closeButton}
                onClick={() => setIsMenuOpen(false)}
                aria-label='Close burger menu'
              >
                <svg width='32' height='32' aria-hidden='true'>
                  <use href='/sprite.svg#icon-close' />
                </svg>
              </button>
            </div>

            <div className={styles.menuSlot} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
