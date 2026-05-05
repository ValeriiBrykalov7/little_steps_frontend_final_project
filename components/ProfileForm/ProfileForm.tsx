'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Gender, User } from '@/types/user';
import { updateTheme, updateUser } from '@/lib/api/clientApi';
import { createProfileSchema } from '@/lib/validation/FormShema';
import { getThemeByGender } from '@/lib/helper/theme';
import { useAuthStore } from '@/lib/store/authStore';
import css from './ProfileForm.module.css';
import toast from 'react-hot-toast';
import { Loader } from '../Loader/Loader';
import { DatePicker } from '../DatePicker/DatePicker';
import dayjs from 'dayjs';
import { getDateRange } from '@/lib/helper/date';
import GenderSelect from '../GenderSelect/GenderSelect';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';

type ProfileFormValues = {
  username: string;
  email: string;
  gender: Gender;
  dueDate: Date | null;
};

type SaveProfilePayload = {
  formData: FormData;
  theme: Gender;
};

export const ProfileForm = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const { min, max } = getDateRange({ minOffset: 7 });
  const validationSchema = createProfileSchema(min, max);
  const queryClient = useQueryClient();

  const initialValues: ProfileFormValues = {
    username: user?.username || '',
    email: user?.email || '',
    gender: user?.gender || 'null',
    dueDate: user?.dueDate ? new Date(user.dueDate) : null,
  };

  const { mutate: saveProfile, isPending } = useMutation<
    User,
    Error,
    SaveProfilePayload
  >({
    mutationFn: async ({ formData, theme }) => {
      const updatedUser = await updateUser(formData);
      const updatedTheme = await updateTheme(theme);

      return { ...updatedUser, theme: updatedTheme.theme };
    },
    onSuccess: async (updatedUser) => {
      setUser(updatedUser);
      await queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      toast.success('Дані успішно змінено!');
    },
    onError: (error) => {
      toast.error(`Помилка: ${error.message}`);
    },
  });

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

    saveProfile({
      formData,
      theme: getThemeByGender(values.gender),
    });
  };

  return (
    <div className='container'>
      <div className={css.formContainer}>
        <ProfileAvatar />
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
                    <GenderSelect />
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
