'use client';

import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import type { CreateTaskRequest } from '@/types/task';
import css from './AddTaskForm.module.css';
import { Loader } from '../Loader/Loader';

type AddTaskFormProps = {
  onSubmit: (task: CreateTaskRequest) => Promise<void>;
  onClose: () => void;
};

const getCurrentDate = () => dayjs().format('YYYY-MM-DD');

const getInitialValues = (): CreateTaskRequest => ({
  name: '',
  date: getCurrentDate(),
  isDone: false,
});

const taskSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(1, 'Назва має містити мінімум 1 символ')
    .max(96, 'Назва має містити максимум 96 символів')
    .required("Обов'язкове поле"),

  date: Yup.string()
    .required("Обов'язкове поле")
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Формат дати має бути YYYY-MM-DD')
    .test(
      'min-date',
      'Дата не може бути раніше сьогодні',
      (value) => !value || value >= getCurrentDate(),
    ),

  isDone: Yup.boolean().default(false).required(),
});

export default function AddTaskForm({ onSubmit, onClose }: AddTaskFormProps) {
  const handleSubmit = async (
    values: CreateTaskRequest,
    { resetForm }: FormikHelpers<CreateTaskRequest>,
  ) => {
    try {
      const newTask: CreateTaskRequest = {
        name: values.name.trim(),
        date: values.date,
        isDone: values.isDone ?? false,
      };

      await onSubmit(newTask);

      resetForm();
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Не вдалося зберегти завдання',
      );
    }
  };

  return (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={taskSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={css.AddTaskForm}>
          <div className={css.fieldWrapper}>
            <label className={css.AddTaskFormLabel}>
              Нове завдання
              <Field
                type='text'
                name='name'
                disabled={isSubmitting}
                placeholder='Прийняти вітаміни'
                className={`${css.AddTaskFormInput} ${
                  errors.name && touched.name ? css.inputError : ''
                }`}
              />
              <ErrorMessage
                name='name'
                component='span'
                className={css.AddTaskFormError}
              />
            </label>
          </div>

          <div className={css.fieldWrapper}>
            <label className={css.AddTaskFormLabel}>
              Дата
              <Field
                type='date'
                name='date'
                min={getCurrentDate()}
                disabled={isSubmitting}
                className={`${css.AddTaskFormInput} ${
                  errors.date && touched.date ? css.inputError : ''
                }`}
              />
              <ErrorMessage
                name='date'
                component='span'
                className={css.AddTaskFormError}
              />
            </label>
          </div>

          <Field type='hidden' name='isDone' />

          <button
            type='submit'
            disabled={isSubmitting}
            className={`${css.AddTaskFormButton} pink`}
          >
            {isSubmitting ? <Loader variant='button' /> : 'Зберегти'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
