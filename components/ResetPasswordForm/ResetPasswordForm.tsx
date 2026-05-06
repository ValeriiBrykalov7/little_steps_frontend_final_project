'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { resetPassword } from '@/lib/api/clientApi';

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
    <div>
      <h2>Встановіть новий пароль</h2>
      <Formik
        initialValues={{ password: '' }}
        validationSchema={Yup.object({
          password: Yup.string()
            .min(8, 'Мін. 8 символів')
            .required('Обов’язково'),
        })}
        onSubmit={(values) => mutate(values.password)}
      >
        <Form>
          <div>
            <Field type='password' name='password' placeholder='Новий пароль' />
            <ErrorMessage name='password' component='div' />
          </div>

          <button type='submit' disabled={isPending}>
            {isPending ? 'Оновлення...' : 'Змінити пароль'}
          </button>
        </Form>
      </Formik>
    </div>
  );
}
