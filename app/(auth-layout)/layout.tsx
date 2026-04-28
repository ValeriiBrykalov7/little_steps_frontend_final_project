import Logo from '@/components/Logo/Logo';
import '../../css/container.css';
import styles from './layout.module.css';
import ImageAuth from '@/components/ImageAuth/ImageAuth';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.main}>
      <div className={`container ${styles.wrapper}`}>
        <div className={styles.childrenWrapper}>
          <Logo />
          {children}
        </div>
        <ImageAuth />
      </div>
    </main>
  );
}
