'use client';
import LoginForm from '@/components/LoginForm/LoginForm';
import styles from './page.module.css';
import { useParams } from 'next/navigation';

export default function ToggleLoginRegister() {
  const params = useParams();
  const authType = params.authType as string;

  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        {authType === 'login' && <LoginForm />}
        {/* {authType === 'register' && <RegistrationForm/>} */}
      </div>
    </main>
  );
}
