'use client';

import { Gender } from '@/types/user';
import { Formik, Form, ErrorMessage } from 'formik';
import PhotoDropzone from '../PhotoDropzone/PhotoDropzone';
import GenderSelect from '../GenderSelect/GenderSelect';
import styles from './OnboardingForm.module.css';
import { updateUser } from '@/lib/api/clientApi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { useAuthStore } from '@/lib/store/authStore';
import 'react-datepicker/dist/react-datepicker.css';
import { DueDatePicker } from '../DueDatePicker/DueDatePicker';
import { max, min } from '@/lib/helper/date';
import toast from 'react-hot-toast';

export type GenderOption = {
  value: Gender;
  label: string;
};

export interface FormValues {
  photo: File | null;
  gender: GenderOption | null;
  dueDate: Date | null;
}

export const validationSchema = Yup.object({
  gender: Yup.object().nullable(),

  dueDate: Yup.date()
    .nullable()
    .min(min, 'Дата не може бути раніше дозволеної')
    .max(max, 'Дата не може бути пізніше дозволеної'),

  photo: Yup.mixed().nullable(),
});

export default function OnboardingForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const initialValues: FormValues = {
    photo: null,
    gender: null,
    dueDate: null,
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
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

    if (values.gender?.value) {
      formData.append('gender', values.gender.value);
    }

    if (values.dueDate) {
      const year = values.dueDate.getFullYear();
      const month = String(values.dueDate.getMonth() + 1).padStart(2, '0');
      const day = String(values.dueDate.getDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;

      formData.append('dueDate', formattedDate);
    }

    if (values.photo) {
      formData.append('photo', values.photo);
    }

    mutate(formData);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <PhotoDropzone />

          <ErrorMessage
            name='photo'
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

              <DueDatePicker />

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
            Зберегти
          </button>
        </Form>
      )}
    </Formik>
  );
}
