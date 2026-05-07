import LoginForm from '@/components/LoginForm/LoginForm';
import { notFound } from 'next/navigation';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import ResetPasswordForm from '@/components/ResetPasswordForm/ResetPasswordForm';
import ForgotPasswordForm from '@/components/ForgotPassword/ForgotPassword';
import { createPageMetadata } from '@/lib/helper/metadata';

type AuthPageProps = {
  params: Promise<{
    authType: string;
  }>;
};

const authPages = {
  login: {
    title: 'Вхід',
    description:
      'Увійдіть у додаток Лелека, щоб продовжити відстежувати вагітність, поради, записи й завдання.',
    imageAlt: 'Лелека - вхід у додаток',
  },
  register: {
    title: 'Реєстрація',
    description:
      'Створіть акаунт у додатку Лелека, щоб отримувати персоналізовані поради та вести щоденник вагітності.',
    imageAlt: 'Лелека - реєстрація',
  },
  'forgot-password': {
    title: 'Відновлення доступу',
    description:
      'Відновіть доступ до акаунта Лелека, отримавши лист для скидання пароля.',
    imageAlt: 'Лелека - відновлення доступу',
  },
  'reset-password': {
    title: 'Новий пароль',
    description:
      'Встановіть новий пароль для свого акаунта у додатку Лелека.',
    imageAlt: 'Лелека - новий пароль',
  },
} as const;

type AuthType = keyof typeof authPages;

const isAuthType = (value: string): value is AuthType => value in authPages;

export async function generateMetadata({ params }: AuthPageProps) {
  const { authType } = await params;

  if (!isAuthType(authType)) {
    return createPageMetadata({
      title: 'Авторизація',
      description:
        'Увійдіть або створіть акаунт у додатку Лелека, щоб продовжити користуватися сервісом.',
      path: '/auth/login',
      imageAlt: 'Лелека - авторизація',
    });
  }

  const page = authPages[authType];

  return createPageMetadata({
    ...page,
    path: `/auth/${authType}`,
  });
}

export default async function ToggleLoginRegister({ params }: AuthPageProps) {
  const { authType } = await params;

  if (!isAuthType(authType)) {
    return notFound();
  }

  return (
    <>
      {authType === 'login' && <LoginForm />}
      {authType === 'register' && <RegistrationForm />}
      {authType === 'forgot-password' && <ForgotPasswordForm />}
      {authType === 'reset-password' && <ResetPasswordForm />}
    </>
  );
}
