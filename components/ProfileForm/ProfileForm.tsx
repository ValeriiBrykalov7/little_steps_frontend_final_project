'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field } from 'formik';
import { User } from '@/types/user';
import { updateUser } from '@/lib/api/clientApi';
import { profileSchema } from '@/lib/validation/FormShema';
import { useAuthStore } from '@/lib/store/authStore';
import css from './ProfileForm.module.css';
import toast from 'react-hot-toast';
import Icon from '../Icon/Icon';

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
        toast.success('Дані успішно змінено!');
      },
      onError: (error) => {
        toast.error(`Помилка: ${error.message}`);
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
    <div className='container'>
      <div className={css.formContainer}>
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
            <Form className={css.formFildContainer}>
              <div className={css.fildContainer}>
                <div className={css.formFild}>
                  <label htmlFor='username' className={css.label}>
                    {"Ім'я"}
                  </label>
                  <Field
                    name='username'
                    id='username'
                    placeholder="Введіть ім'я"
                    className={css.input}
                  />
                </div>

                <div className={css.formFild}>
                  <label htmlFor='email' className={css.label}>
                    Пошта
                  </label>
                  <Field
                    name='email'
                    id='email'
                    type='email'
                    placeholder='example@mail.com'
                    className={css.input}
                  />
                </div>

                <div className={css.formFild}>
                  <label htmlFor='gender' className={css.label}>
                    Стать дитини
                  </label>
                  <div className={css.inputWrapper}>
                    <Field
                      as='select'
                      name='gender'
                      id='gender'
                      className={css.select}
                    >
                      <option value='null'>Оберіть стать</option>
                      <option value='boy'>Хлопчик</option>
                      <option value='girl'>Дівчинка</option>
                    </Field>
                    <Icon
                      name='icon-keyboard_arrow_down'
                      size={18}
                      className={css.selectIcon}
                    />
                  </div>
                </div>

                <div className={css.formFild}>
                  <label htmlFor='dueDate'>Планова дата пологів</label>
                  <div className={css.inputWrapper}>
                    <Field
                      name='dueDate'
                      id='dueDate'
                      type='date'
                      className={css.select}
                    />
                    <Icon
                      name='icon-keyboard_arrow_down'
                      size={18}
                      className={css.selectIcon}
                    />
                  </div>
                </div>
              </div>

              <div className={css.btnContainer}>
                <button
                  type='button'
                  className='gray {css.btnCncl}'
                  onClick={() => resetForm()}
                >
                  Відмінити зміни
                </button>

                <button
                  type='submit'
                  className='pink {css.btnSave}'
                  disabled={isPending}
                >
                  {isPending ? 'Збереження...' : 'Зберегти зміни'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
