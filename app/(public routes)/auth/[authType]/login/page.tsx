import LoginForm from '@/components/LoginForm/LoginForm';
import styles from './LoginPage.module.css';


export default function Login() {
  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <LoginForm/>
      </div>
    </main>
  );
}