'use client';

import { useMutation } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Gender, User } from '@/types/user';
import { updateUser } from '@/lib/api/clientApi';
import { createProfileSchema } from '@/lib/validation/FormShema';
import { useAuthStore } from '@/lib/store/authStore';
import css from './ProfileForm.module.css';
import toast from 'react-hot-toast';
import Icon from '../Icon/Icon';
import { Loader } from '../Loader/Loader';
import { DatePicker } from '../DatePicker/DatePicker';
import dayjs from 'dayjs';
import { getDateRange } from '@/lib/helper/date';

type ProfileFormValues = {
  username: string;
  email: string;
  gender: Gender;
  dueDate: Date | null;
};

export const ProfileForm = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const { min, max } = getDateRange({ minOffset: 7 });
  const validationSchema = createProfileSchema(min, max);

  const initialValues: ProfileFormValues = {
    username: user?.username || '',
    email: user?.email || '',
    gender: user?.gender || 'null',
    dueDate: user?.dueDate ? new Date(user.dueDate) : null,
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

  const handleSubmit = (values: ProfileFormValues) => {
    const formData = new FormData();

    if (values.username.trim()) {
      formData.append('username', values.username.trim());
    }

    if (values.email.trim()) {
      formData.append('email', values.email.trim());
    }

    formData.append('gender', values.gender);

    if (values.dueDate) {
      formData.append('dueDate', dayjs(values.dueDate).format('YYYY-MM-DD'));
    }

    saveProfile(formData);
  };

  return (
    <div className='container'>
      <div className={css.formContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ resetForm, errors, touched }) => (
            <Form className={css.form}>
              <div className={css.fieldsWrapper}>
                <div className={css.field}>
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

                <div className={css.field}>
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

                <div className={css.field}>
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

                <div className={css.field}>
                  <label className={css.label}>Планова дата пологів</label>
                  <DatePicker
                    minDate={min}
                    maxDate={max}
                    className={`${css.select} ${
                      touched.dueDate && errors.dueDate ? css.inputError : ''
                    }`}
                  />
                  <ErrorMessage
                    name='dueDate'
                    component='span'
                    className={css.error}
                  />
                </div>
              </div>

              <div className={css.buttonsWrapper}>
                <button
                  type='button'
                  className={`${css.button} gray`}
                  onClick={() => resetForm()}
                >
                  Відмінити зміни
                </button>

                <button
                  type='submit'
                  className={`${css.button} pink`}
                  disabled={isPending}
                >
                  {isPending ? <Loader variant='button' /> : 'Зберегти зміни'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
