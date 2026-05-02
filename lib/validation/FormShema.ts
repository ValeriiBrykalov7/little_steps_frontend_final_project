import * as yup from 'yup';

export const createProfileSchema = (minDueDate: Date, maxDueDate: Date) =>
  yup.object({
    username: yup.string().min(2, "Ім'я занадто коротке").optional(),
    email: yup.string().email('Невірний формат пошти').optional(),
    gender: yup.string().oneOf(['boy', 'girl', 'null']).optional(),
    dueDate: yup
      .date()
      .nullable()
      .min(minDueDate, 'Дата не може бути раніше дозволеної')
      .max(maxDueDate, 'Дата не може бути пізніше дозволеної')
      .optional(),
  });
