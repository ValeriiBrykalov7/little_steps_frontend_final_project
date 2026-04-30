'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import type { CreateTaskRequest } from '@/types/task';
import css from './AddTaskForm.module.css';

type AddTaskFormProps = {
  onSubmit: (task: CreateTaskRequest) => Promise<void>;
  onClose: () => void;
};

const initialValues: CreateTaskRequest = {
  name: '',
  date: dayjs().format('YYYY-MM-DD'),
};

const taskSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(1, 'Назва має містити мінімум 1 символ')
    .required('Введіть назву завдання'),

  date: Yup.string().required('Введіть дату'),

  isDone: Yup.boolean(),
});

export default function AddTaskForm({ onSubmit, onClose }: AddTaskFormProps) {
  const handleSubmit = async (
    values: CreateTaskRequest,
    { resetForm }: { resetForm: () => void },
  ) => {
    try {
      const newTask: CreateTaskRequest = {
        name: values.name.trim(),
        date: values.date,
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
      initialValues={initialValues}
      validationSchema={taskSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.AddTaskForm}>
          <label className={css.AddTaskFormLabel}>
            Завдання
            <Field
              type='text'
              name='name'
              placeholder='Прийняти вітаміни'
              className={css.AddTaskFormInput}
            />
          </label>

          <ErrorMessage
            name='name'
            component='p'
            className={css.AddTaskFormError}
          />

          <label className={css.AddTaskFormLabel}>
            Дата
            <Field type='date' name='date' className={css.AddTaskFormInput} />
          </label>

          <ErrorMessage
            name='date'
            component='p'
            className={css.AddTaskFormError}
          />

          <button
            type='submit'
            disabled={isSubmitting}
            className={css.AddTaskFormButton}
          >
            {isSubmitting ? 'Збереження...' : 'Зберегти'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
