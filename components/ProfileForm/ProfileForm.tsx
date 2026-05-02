'use client';

import { useMutation } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { User } from '@/types/user';
import { updateUser } from '@/lib/api/clientApi';
import { profileSchema } from '@/lib/validation/FormShema';
import { useAuthStore } from '@/lib/store/authStore';
import css from './ProfileForm.module.css';
import toast from 'react-hot-toast';
import Icon from '../Icon/Icon';

export const ProfileForm = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const initialValues = {
    username: user?.username || '',
    email: user?.email || '',
    gender: user?.gender || 'null',
    dueDate: user?.dueDate
      ? new Date(user.dueDate).toISOString().split('T')[0]
      : '',
  };

  const { mutate: saveProfile, isPending } = useMutation<User, Error, FormData>(
    {
      mutationFn: (formData) => updateUser(formData),
      onSuccess: (updatedUser) => {
        setUser(updatedUser);
        toast.success('Дані успішно змінено!');
      },
      onError: (error) => {
        toast.error(`Помилка: ${error.message}`);
      },
    },
  );

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
            formData.append('gender', values.gender);
            if (values.dueDate) formData.append('dueDate', values.dueDate);

            saveProfile(formData);
          }}
        >
          {({ resetForm, errors, touched }) => (
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
                    className={`${css.input} ${
                      touched.username && errors.username ? css.inputError : ''
                    }`}
                  />
                  <ErrorMessage
                    name='username'
                    component='span'
                    className={css.error}
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
                    className={`${css.input} ${
                      touched.email && errors.email ? css.inputError : ''
                    }`}
                  />
                  <ErrorMessage
                    name='email'
                    component='span'
                    className={css.error}
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
                      className={`${css.select} ${
                        touched.gender && errors.gender ? css.inputError : ''
                      }`}
                    >
                      <option value='null'>Ще не знаю</option>
                      <option value='boy'>Хлопчик</option>
                      <option value='girl'>Дівчинка</option>
                    </Field>
                    <Icon
                      name='icon-keyboard_arrow_down'
                      size={18}
                      className={css.selectIcon}
                    />
                  </div>
                  <ErrorMessage
                    name='gender'
                    component='span'
                    className={css.error}
                  />
                </div>

                <div className={css.formFild}>
                  <label htmlFor='dueDate'>Планова дата пологів</label>
                  <div className={css.inputWrapper}>
                    <Field
                      name='dueDate'
                      id='dueDate'
                      type='date'
                      className={`${css.select} ${
                        touched.dueDate && errors.dueDate ? css.inputError : ''
                      }`}
                    />
                    <Icon
                      name='icon-keyboard_arrow_down'
                      size={18}
                      className={css.selectIcon}
                    />
                  </div>
                  <ErrorMessage
                    name='dueDate'
                    component='span'
                    className={css.error}
                  />
                </div>
              </div>

              <div className={css.btnContainer}>
                <button
                  type='button'
                  className='gray'
                  onClick={() => resetForm()}
                >
                  Відмінити зміни
                </button>

                <button type='submit' className='pink' disabled={isPending}>
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
