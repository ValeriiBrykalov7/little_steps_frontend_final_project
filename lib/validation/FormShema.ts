import * as yup from 'yup';

export const profileSchema = yup.object({
  username: yup.string().min(2, "Ім'я занадто коротке").optional(),
  email: yup.string().email('Невірний формат пошти').optional(),
  gender: yup.string().oneOf(['boy', 'girl', 'null']).optional(),
  dueDate: yup.string().nullable().optional(),
});
