'use client';
import Link from 'next/link';
import styles from './LoginForm.module.css';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { login } from '@/lib/api/clientApi';
import GoogleAuthButton from '../GoogleAuthButton/GoogleAuthButton';
import { Loader } from '../Loader/Loader';

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email('Некоректний email').required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .required("Обов'язкове поле"),
});

export default function LoginForm() {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    try {
      const data = await login(values);

      setUser(data);

      toast.success('Вхід успішний! Вітаємо 👋');
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error('Email або пароль неправильні. Спробуйте ще раз.');
      } else {
        toast.error('Помилка входу');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.containerTwo}>
        <div className={styles.formCont}>
          <h1 className={styles.title}>Вхід</h1>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className={styles.form}>
                <div className={styles.fieldWrapper}>
                  <label className={styles.label}>
                    <Field
                      name='email'
                      type='email'
                      autoComplete='email'
                      disabled={isSubmitting}
                      placeholder='Пошта'
                      className={`${styles.input} ${
                        errors.email && touched.email ? styles.inputError : ''
                      }`}
                    />
                    <ErrorMessage
                      name='email'
                      component='span'
                      className={styles.error}
                    />
                  </label>
                </div>

                <div className={styles.fieldWrapper}>
                  <label className={styles.label}>
                    <Field
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      disabled={isSubmitting}
                      placeholder='Пароль'
                      className={`${styles.input} ${
                        errors.password && touched.password
                          ? styles.inputError
                          : ''
                      }`}
                    />
                    <ErrorMessage
                      name='password'
                      component='span'
                      className={styles.error}
                    />
                  </label>
                </div>
                <button
                  type='submit'
                  className={`${styles.button} pink`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader variant='button' /> : 'Увійти'}
                </button>
                <GoogleAuthButton />

                <p className={styles.loginPrompt}>
                  Немає аккаунту?{' '}
                  <Link href='/auth/register' className={styles.loginLink}>
                    Зареєструватися
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className={styles.background} />
    </section>
  );
}
