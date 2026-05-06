'use client';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { requestResetEmail } from '@/lib/api/clientApi';
import Link from 'next/link';

export default function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (values: { email: string }) => {
    try {
      await requestResetEmail(values);
      toast.success('Лист відправлено!');
      setIsSubmitted(true); // Показуємо заглушку
    } catch (error) {
      toast.error('Щось пішло не так на сервері');
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h2>Перевірте вашу пошту</h2>
        <p>Ми надіслали посилання для відновлення пароля на ваш email.</p>
        <Link href='/auth/login'>Повернутися до входу</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Відновлення доступу</h2>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          email: Yup.string().email('Невірний формат').required('Обов’язково'),
        })}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name='email' type='email' placeholder='Введіть ваш email' />
            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Надсилаємо...' : 'Надіслати лист'}
            </button>
          </Form>
        )}
      </Formik>
      <Link href='/auth/login'>Повернутися до входу</Link>
    </div>
  );
}
