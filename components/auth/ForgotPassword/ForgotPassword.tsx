'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { requestResetEmail } from '@/lib/api/clientApi';
import { Loader } from '@/components/common/Loader/Loader';
import styles from './ForgotPassword.module.css';

type ForgotPasswordValues = {
  email: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Некоректний email')
    .required("Обов'язкове поле"),
});

export default function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (values: ForgotPasswordValues) => {
    try {
      await requestResetEmail(values);
      toast.success('Якщо email існує, то лист відправлено!');
      setIsSubmitted(true);
    } catch {
      toast.error('Щось пішло не так на сервері');
    }
  };

  if (isSubmitted) {
    return (
      <section className={styles.wrapper}>
        <div className={styles.formCont}>
          <div className={styles.statusCard}>
            <h1 className={styles.title}>Перевірте вашу пошту</h1>
            <p className={styles.description}>
              Ми надіслали посилання для відновлення пароля на ваш email.
            </p>
            <Link href='/auth/login' className={styles.loginLink}>
              Повернутися до входу
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.formCont}>
        <h1 className={styles.title}>Відновлення доступу</h1>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, validateForm, values }) => (
            <Form
              className={styles.form}
              onSubmitCapture={() => {
                void validateForm(values).then((formErrors) => {
                  if (Object.keys(formErrors).length > 0) {
                    toast.error('Введіть коректний email');
                  }
                });
              }}
            >
              <div className={styles.fieldWrapper}>
                <label className={styles.label}>
                  <Field
                    name='email'
                    type='email'
                    autoComplete='email'
                    disabled={isSubmitting}
                    placeholder='Введіть ваш email'
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

              <button
                type='submit'
                className={`${styles.button} pink`}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader variant='button' /> : 'Надіслати лист'}
              </button>

              <p className={styles.loginPrompt}>
                <Link href='/auth/login' className={styles.loginLink}>
                  Повернутися до входу
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
