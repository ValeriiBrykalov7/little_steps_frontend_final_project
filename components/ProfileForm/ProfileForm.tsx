'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { profileSchema } from '@/lib/validation/FormShema';
import { useAuthStore } from '@/lib/store/authStore';
import { updateUser } from '@/lib/api/clientApi';
import { User } from '@/types/user';
import dayjs from 'dayjs';

type ProfileFormValues = Partial<User>;

export const ProfileForm = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate: saveProfile, isPending } = useMutation({
    mutationFn: (values: ProfileFormValues) => {
      const payload: Partial<User> = {};

      (Object.keys(values) as Array<keyof ProfileFormValues>).forEach((key) => {
        const newValue = values[key];
        const initialValue = user?.[key];

        if (
          newValue !== initialValue &&
          newValue !== '' &&
          newValue !== 'null' &&
          newValue !== undefined &&
          newValue !== null
        ) {
          if (key === 'dueDate' && typeof newValue === 'string') {
            payload[key] = dayjs(newValue).toISOString();
          } else {
            (payload[key] as typeof newValue) = newValue;
          }
        }
      });

      if (Object.keys(payload).length === 0) {
        return Promise.reject(new Error('Змін не виявлено'));
      }

      return updateUser(payload);
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['currentUser'], updatedUser);
      setUser(updatedUser);
      alert('Дані успішно змінено!');
    },
    onError: () => {
      alert('Помилка при оновленні профілю');
    },
  });

  const initialValues = {
    username: user?.username || '',
    email: user?.email || '',
    gender: user?.gender || 'null',
    dueDate: user?.dueDate || '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={profileSchema}
      enableReinitialize
      onSubmit={(values) => saveProfile(values)}
    >
      {({ dirty, handleReset }) => (
        <Form className='form-wrapper'>
          <div className='form-field'>
            <label htmlFor='username'>{"Ім'я"}</label>
            <Field name='username' id='username' placeholder="Введіть ім'я" />
            <ErrorMessage
              name='username'
              component='div'
              className='error-message'
            />
          </div>

          <div className='form-field'>
            <label htmlFor='email'>Пошта</label>
            <Field
              name='email'
              id='email'
              type='email'
              placeholder='example@mail.com'
            />
            <ErrorMessage
              name='email'
              component='div'
              className='error-message'
            />
          </div>

          <div className='form-field'>
            <label htmlFor='gender'>Стать дитини</label>
            <Field as='select' name='gender' id='gender'>
              <option value='null'>Оберіть стать</option>
              <option value='boy'>Хлопчик</option>
              <option value='girl'>Дівчинка</option>
            </Field>
          </div>

          <div className='form-field'>
            <label htmlFor='dueDate'>Планова дата пологів</label>
            <Field name='dueDate' id='dueDate' type='date' />
          </div>

          <div className='btn-cnlc'>
            <button
              type='button'
              className='btn-cancel'
              onClick={handleReset}
              disabled={!dirty || isPending}
            >
              Відмінити зміни
            </button>

            <button
              type='submit'
              className='btn-save'
              disabled={isPending || !dirty}
            >
              {isPending ? 'Збереження...' : 'Зберегти зміни'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
