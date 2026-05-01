'use client';

import { Gender } from '@/types/user';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PhotoDropzone from '../PhotoDropzone/PhotoDropzone';
import GenderSelect from '../GenderSelect/GenderSelect';
import styles from './OnboardingForm.module.css';
import '../../css/base.css';
import { updateUser } from '@/lib/api/clientApi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

export type GenderOption = {
  value: Gender;
  label: string;
};

export interface FormValues {
  photo: File | null;
  gender: GenderOption | null;
  dueDate: string;
}

const today = new Date();

const min = new Date(today);
min.setDate(today.getDate() + 7);

const max = new Date(today);
max.setDate(today.getDate() + 280);

export const validationSchema = Yup.object({
  gender: Yup.object().nullable(),

  dueDate: Yup.string()
    .nullable()
    .test('min-date', 'Date is too early', (value) => {
      if (!value) return true;
      return new Date(value) >= min;
    })
    .test('max-date', 'Date is too late', (value) => {
      if (!value) return true;
      return new Date(value) <= max;
    }),

  photo: Yup.mixed().nullable(),
});
export default function OnboardingForm() {
  const router = useRouter();

  const initialValues: FormValues = {
    photo: null,
    gender: null,
    dueDate: '',
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => router.push('/'),
    onError: () => {
      console.error('Something went wrong. Please try again.');
    },
  });

  const handleSubmit = async (values: FormValues) => {
    const formData = new FormData();

    if (values.gender?.value) {
      formData.append('gender', values.gender.value);
    }

    if (values.dueDate) {
      formData.append('dueDate', values.dueDate);
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

              <Field
                id='dueDate'
                name='dueDate'
                type='date'
                className={`${styles.dateInput} ${
                  touched.dueDate && errors.dueDate ? styles.inputError : ''
                }`}
              />

              <ErrorMessage
                name='dueDate'
                component='span'
                className={styles.error}
              />
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
