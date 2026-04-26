'use client';
import Link from 'next/link';
import styles from './LoginForm.module.css';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast/headless';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';
import { useAuthStore } from '@/lib/store/authStore';
import { api } from '@/app/api/api';

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
  const handleSubmit = async(  values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>)=>{try {
    const { data } = await api.post<User>('/auth/login', values);

      setUser(data);

      toast.success('Вхід успішний! Вітаємо 👋');
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || 'Email або пароль невірні');
      } else {
        toast.error('Помилка входу');
      }
    } finally {
      setSubmitting(false);
    }};

  return (
    <section className={styles.wrapper}>
      <div className={styles.containerRegister}>
        <div className={styles.containerTwo}>
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <div className={styles.logo}>
                {/* <Link href="/" className={styles.logo}>
                  <svg width="31" height="30">
                    <use href="/sprite.svg#icon-Google" />
                  </svg>
                  <svg width="61" height="13">
                    <use href="/sprite.svg#icon-menu" />
                  </svg>
                </Link> */}
              </div>
            </div>
          </div>

          <div className={styles.formCont}>
            <h1 className={styles.title}>Вхід</h1>

            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className={styles.form}>
                  <label className={styles.label}>
                    <Field
                      name="email"
                      type="email"
                      autoComplete="email"
                      disabled={isSubmitting}
                      placeholder="Пошта"
                      className={`${styles.input} ${
                        errors.email && touched.email ? styles.inputError : ''
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className={styles.error}
                    />
                  </label>

                  <label className={styles.label}>
                    <Field
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      disabled={isSubmitting}
                      placeholder="Пароль"
                      className={`${styles.input} ${
                        errors.password && touched.password
                          ? styles.inputError
                          : ''
                      }`}
                    />
                    <ErrorMessage
                      name="password"
                      component="span"
                      className={styles.error}
                    />
                  </label>

                  <button
                    type="submit"
                    className={styles.button}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Завантаження...' : 'Увійти'}
                  </button>

                  <p className={styles.loginPrompt}>
                    Немає аккаунту?{' '}
                    <Link href="/auth/register" className={styles.loginLink}>
                      Зареєструватися
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className={styles.background} />
      </div>
    </section>
  );
}
