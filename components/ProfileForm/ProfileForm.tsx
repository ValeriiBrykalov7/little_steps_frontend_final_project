'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field } from 'formik';
import { Gender, User } from '@/types/user';
import { updateUser } from '@/lib/api/clientApi';
import { profileSchema } from '@/lib/validation/FormShema';
import { useAuthStore } from '@/lib/store/authStore';

export const ProfileForm = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate: saveProfile, isPending } = useMutation<User, Error, FormData>(
    {
      mutationFn: (formData) => updateUser(formData),
      onSuccess: (updatedUser) => {
        queryClient.setQueryData(['currentUser'], updatedUser);
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        setUser(updatedUser);
        alert('Дані успішно змінено!');
      },
      onError: (error) => {
        alert(`Помилка: ${error.message}`);
      },
    },
  );

  const initialValues = {
    username: user?.username || '',
    email: user?.email || '',
    gender: user?.gender || 'null',
    dueDate: user?.dueDate
      ? new Date(user.dueDate).toISOString().split('T')[0]
      : '',
  };

  return (
    <div className='form-wrapper'>
      <Formik
        initialValues={initialValues}
        validationSchema={profileSchema}
        enableReinitialize
        onSubmit={(values) => {
          const formData = new FormData();

          if (values.username.trim())
            formData.append('username', values.username.trim());
          if (values.email.trim())
            formData.append('email', values.email.trim());
          if (values.gender !== 'null')
            formData.append('gender', values.gender);
          if (values.dueDate) formData.append('dueDate', values.dueDate);

          saveProfile(formData);
        }}
      >
        {({ resetForm }) => (
          <Form>
            <div className='form-field'>
              <label htmlFor='username'>{"Ім'я"}</label>
              <Field name='username' id='username' placeholder="Введіть ім'я" />
            </div>

            <div className='form-field'>
              <label htmlFor='email'>Пошта</label>
              <Field
                name='email'
                id='email'
                type='email'
                placeholder='example@mail.com'
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

            <div className='btn-cncl'>
              <button
                type='button'
                className='btn-cancel'
                onClick={() => resetForm()}
              >
                Відмінити зміни
              </button>

              <button type='submit' className='btn-save' disabled={isPending}>
                {isPending ? 'Збереження...' : 'Зберегти зміни'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
