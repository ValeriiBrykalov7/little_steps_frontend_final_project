import Link from 'next/link';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <>
      <div className={styles.logo_container}>
        <Link href='/' aria-label='Home' className={styles.logo_link}>
          <svg width="24" height="24" className={styles.header_logo}>
                <use href="/sprite.svg#icon-logo"></use>
              </svg>
              <svg width="49" height="11" className={styles.header_leleka}>
                <use href="/sprite.svg#icon-leleka"></use>
              </svg>
        </Link>
      </div>
    </>
  );
}
