'use client';

import { Formik, Form, ErrorMessage } from 'formik';
import PhotoDropzone from '@/components/profile/PhotoDropzone/PhotoDropzone';
import GenderSelect from '@/components/profile/GenderSelect/GenderSelect';
import styles from './OnboardingForm.module.css';
import { updateTheme, updateUser } from '@/lib/api/clientApi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { useAuthStore } from '@/lib/store/authStore';
import { DatePicker } from '@/components/common/DatePicker/DatePicker';
import toast from 'react-hot-toast';
import { Loader } from '@/components/common/Loader/Loader';
import { getDateRange } from '@/lib/helper/date';
import { getThemeByGender } from '@/lib/helper/theme';
import { Gender, User } from '@/types/user';

export interface FormValues {
  avatar: File | null;
  gender: Gender | 'null';
  dueDate: Date | null;
}

type SaveOnboardingPayload = {
  formData: FormData;
  theme: Gender;
};

const createValidationSchema = (min: Date, max: Date) =>
  Yup.object({
    gender: Yup.string().oneOf(['boy', 'girl', 'null']),

    dueDate: Yup.date()
      .nullable()
      .min(min, 'Дата не може бути раніше дозволеної')
      .max(max, 'Дата не може бути пізніше дозволеної'),

    avatar: Yup.mixed().nullable(),
  });

export default function OnboardingForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const { min, max } = getDateRange({ minOffset: 7 }); // якщо не передати minOffset, мінімальна доступна дата буде сьогодні
  const ValidationSchema = createValidationSchema(min, max);

  const initialValues: FormValues = {
    avatar: null,
    gender: 'null',
    dueDate: null,
  };

  const { mutate, isPending } = useMutation<
    User,
    Error,
    SaveOnboardingPayload
  >({
    mutationFn: async ({ formData, theme }: SaveOnboardingPayload) => {
      const updatedUser = await updateUser(formData);
      const updatedTheme = await updateTheme(theme);

      return { ...updatedUser, theme: updatedTheme.theme };
    },
    onSuccess: (user) => {
      setUser(user);
      toast.success('Дані успішно збережено');
      router.push('/');
    },
    onError: () => {
      toast.error('Сталася помилка. Спробуйте ще раз.');
    },
  });

  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();

    formData.append('gender', values.gender);

    if (values.dueDate) {
      const year = values.dueDate.getFullYear();
      const month = String(values.dueDate.getMonth() + 1).padStart(2, '0');
      const day = String(values.dueDate.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;

      formData.append('dueDate', formattedDate);
    }

    if (values.avatar) {
      formData.append('avatar', values.avatar);
    }

    mutate({
      formData,
      theme: getThemeByGender(values.gender),
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ValidationSchema}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <PhotoDropzone />

          <ErrorMessage
            name='avatar'
            component='span'
            className={styles.error}
          />

          <div className={styles.selectsWrapper}>
            <div className={styles.field}>
              <label className={styles.label}>Стать дитини</label>

              <GenderSelect />

              {touched.gender && errors.gender && (
                <span className={styles.error}>{errors.gender}</span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor='dueDate' className={styles.label}>
                Планова дата пологів
              </label>

              <DatePicker
                minDate={min}
                maxDate={max}
                className={styles.datePickerInput}
              />

              {touched.dueDate && errors.dueDate && (
                <span className={styles.error}>{errors.dueDate}</span>
              )}
            </div>
          </div>

          <button
            type='submit'
            className={`${styles.button} pink`}
            disabled={isPending}
          >
            {isPending ? <Loader variant='button' /> : 'Зберегти'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
