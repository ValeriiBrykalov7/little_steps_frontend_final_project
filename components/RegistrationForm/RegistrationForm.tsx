'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import styles from './RegistrationForm.module.css';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '@/lib/api/clientApi';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/store/authStore';
import GoogleAuthButton from '../GoogleAuthButton/GoogleAuthButton';
import { Loader } from '../Loader/Loader';

interface RegistrationFormValues {
  username: string;
  email: string;
  password: string;
}

const initialValues: RegistrationFormValues = {
  username: '',
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  username: Yup.string()
    .max(32, 'Максимум 32 символи')
    .required("Ім'я обов'язкове"),

  email: Yup.string()
    .email('Некоректний email')
    .max(64, 'Максимум 64 символи')
    .required("Пошта обов'язкова"),

  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required("Пароль обов'язковий"),
});

export default function RegistrationForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate, isPending } = useMutation({
    mutationFn: register,

    onSuccess: (user) => {
      setUser(user);
      toast.success('Реєстрація успішна!');
      router.push('/profile/edit');
    },

    onError: () => {
      toast.error('Помилка під час реєстрації. Спробуйте ще раз.');
    },
  });

  const handleSubmit = (values: RegistrationFormValues) => {
    mutate(values);
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Реєстрація</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <div className={styles.fieldWrapper}>
              <label htmlFor='username' className={styles.label}>
                Ім’я*
              </label>

              <Field
                id='username'
                name='username'
                type='text'
                placeholder='Ваше ім’я'
                className={`${styles.input} ${
                  touched.username && errors.username ? styles.inputError : ''
                }`}
              />

              <ErrorMessage
                name='username'
                component='span'
                className={styles.error}
              />
            </div>

            <div className={styles.fieldWrapper}>
              <label htmlFor='email' className={styles.label}>
                Пошта*
              </label>

              <Field
                id='email'
                name='email'
                type='email'
                placeholder='hello@leleka.com'
                className={`${styles.input} ${
                  touched.email && errors.email ? styles.inputError : ''
                }`}
              />

              <ErrorMessage
                name='email'
                component='span'
                className={styles.error}
              />
            </div>

            <div className={styles.fieldWrapper}>
              <label htmlFor='password' className={styles.label}>
                Пароль*
              </label>

              <Field
                id='password'
                name='password'
                type='password'
                placeholder='********'
                className={`${styles.input} ${
                  touched.password && errors.password ? styles.inputError : ''
                }`}
              />

              <ErrorMessage
                name='password'
                component='span'
                className={styles.error}
              />
            </div>

            <button
              type='submit'
              className={`${styles.button} pink`}
              disabled={isPending}
            >
              {isPending ? <Loader variant='button' /> : 'Зареєструватись'}
            </button>
              <GoogleAuthButton />
          </Form>
        )}
      </Formik>

      <p className={styles.text}>
        Вже маєте акаунт?{' '}
        <Link href='/auth/login' className={styles.link}>
          Увійти
        </Link>
      </p>
    </div>
  );
}
