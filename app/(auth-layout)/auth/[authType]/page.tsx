'use client';
import LoginForm from '@/components/LoginForm/LoginForm';
import styles from './page.module.css';
import { notFound, useParams } from 'next/navigation';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';

export default function ToggleLoginRegister() {
  const params = useParams();
  const authType = params.authType as string;

  if (authType !== 'login' && authType !== 'register') {
    notFound();
  }

  return (
    <>
      {authType === 'login' && <LoginForm />}
      {authType === 'register' && <RegistrationForm />}
    </>
  );
}
