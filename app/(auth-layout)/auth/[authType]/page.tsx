'use client';
import LoginForm from '@/components/LoginForm/LoginForm';
import { notFound, useParams } from 'next/navigation';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import ForgotPassword from '@/components/ForgotPassword/ForgotPassword';
import ResetPasswordForm from '@/components/ResetPasswordForm/ResetPasswordForm';

export default function ToggleLoginRegister() {
  const params = useParams();
  const authType = params.authType as string;

  if (
    authType !== 'login' &&
    authType !== 'register' &&
    authType !== 'forgot-password' &&
    authType !== 'reset-password'
  ) {
    return notFound();
  }

  return (
    <>
      {authType === 'login' && <LoginForm />}
      {authType === 'register' && <RegistrationForm />}
      {authType === 'forgot-password' && <ForgotPassword />}
      {authType === 'reset-password' && <ResetPasswordForm />}
    </>
  );
}
