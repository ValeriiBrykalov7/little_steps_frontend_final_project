'use client';

import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import type { CreateTaskRequest } from '@/types/task';
import { createTask } from '@/lib/api/clientApi';
import css from './AddTaskForm.module.css';
import { Loader } from '@/components/common/Loader/Loader';
import { DatePicker } from '@/components/common/DatePicker/DatePicker';
import { getDateRange } from '@/lib/helper/date';

type AddTaskFormProps = {
  onClose: () => void;
};

type AddTaskFormValues = {
  name: string;
  dueDate: Date | null;
  isDone: boolean;
};

const formatDate = (date: Date) => dayjs(date).format('YYYY-MM-DD');

const getInitialValues = (): AddTaskFormValues => ({
  name: '',
  dueDate: getDateRange().min,
  isDone: false,
});

const taskSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(1, 'Назва має містити мінімум 1 символ')
    .max(96, 'Назва має містити максимум 96 символів')
    .required("Обов'язкове поле"),

  dueDate: Yup.date()
    .nullable()
    .required("Обов'язкове поле")
    .min(getDateRange().min, 'Дата не може бути раніше сьогодні'),

  isDone: Yup.boolean().default(false).required(),
});

export default function AddTaskForm({ onClose }: AddTaskFormProps) {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleSubmit = async (
    values: AddTaskFormValues,
    { resetForm }: FormikHelpers<AddTaskFormValues>,
  ) => {
    try {
      if (!values.dueDate) return;

      const newTask: CreateTaskRequest = {
        name: values.name.trim(),
        date: formatDate(values.dueDate),
        isDone: values.isDone ?? false,
      };

      await createTaskMutation.mutateAsync(newTask);

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
      {({ isSubmitting, errors, touched, validateForm, values }) => (
        <Form
          className={css.AddTaskForm}
          onSubmitCapture={() => {
            void validateForm(values).then((formErrors) => {
              if (Object.keys(formErrors).length > 0) {
                toast.error('Заповніть коректно назву і дату завдання');
              }
            });
          }}
        >
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
              <DatePicker
                minDate={getDateRange().min}
                className={`${css.AddTaskFormInput} ${
                  errors.dueDate && touched.dueDate ? css.inputError : ''
                }`}
              />
              <ErrorMessage
                name='dueDate'
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
