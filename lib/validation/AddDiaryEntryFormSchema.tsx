import * as Yup from 'yup';

export const AddDiaryEntryFormSchema = Yup.object().shape({
  title: Yup.string()
    .required("Заголовок є обов'язковим")
    .min(1, 'Заголовок має бути не менше 1 символа')
    .max(64, 'Заголовок має бути не більше 64 символів'),
  content: Yup.string()
    .required("Запис є обов'язковим")
    .min(1, 'Запис має бути не менше 1 символа')
    .max(1000, 'Запис має бути не більше 1000 символів'),
  // categories: Yup.array()
  //   .required('Оберіть принаймні одну категорію')
  //   .of(Yup.number().integer('Має бути цілим числом'))
  //   .min(1, 'Оберіть принаймні одну категорію')
  //   .max(12, 'Оберіть не більше 12 категорій')
});