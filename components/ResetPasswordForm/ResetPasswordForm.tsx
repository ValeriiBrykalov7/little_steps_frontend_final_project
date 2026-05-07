'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetPassword } from '@/lib/api/clientApi';
import { Loader } from '../Loader/Loader';
import styles from './ResetPasswordForm.module.css';

type ResetPasswordValues = {
  password: string;
};

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .required("Обов'язкове поле"),
});

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { mutate, isPending } = useMutation({
    mutationFn: (password: string) => resetPassword(password, token || ''),
    onSuccess: () => {
      toast.success('Пароль змінено');
      router.push('/auth/login');
    },
    onError: () => {
      toast.error('Не вдалося змінити пароль');
    },
  });

  return (
    <section className={styles.wrapper}>
      <div className={styles.formCont}>
        <h1 className={styles.title}>Встановіть новий пароль</h1>

        <Formik<ResetPasswordValues>
          initialValues={{ password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            mutate(values.password, {
              onSettled: () => setSubmitting(false),
            });
          }}
        >
          {({ isSubmitting, errors, touched, validateForm, values }) => {
            const isLoading = isPending || isSubmitting;

            return (
              <Form
                className={styles.form}
                onSubmitCapture={() => {
                  void validateForm(values).then((formErrors) => {
                    if (Object.keys(formErrors).length > 0) {
                      toast.error('Пароль має містити мінімум 8 символів');
                    }
                  });
                }}
              >
                <div className={styles.fieldWrapper}>
                  <label className={styles.label}>
                    <Field
                      type='password'
                      name='password'
                      autoComplete='new-password'
                      disabled={isLoading}
                      placeholder='Новий пароль'
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
                  disabled={isLoading}
                >
                  {isLoading ? <Loader variant='button' /> : 'Змінити пароль'}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </section>
  );
}
