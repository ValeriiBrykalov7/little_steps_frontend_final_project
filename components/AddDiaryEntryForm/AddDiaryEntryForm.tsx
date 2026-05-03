import { useId } from 'react';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import ReactSelect from 'react-select';
import css from './AddDiaryEntryForm.module.css';
import CustomDropdownIndicator from '../CustomDropdownIndicator/CustomDropdownIndicator';
import CheckboxOption from '../EmotionsOption/EmotionOption';
import { EmotionOption } from '@/types/option';
import { Emotion } from '@/types/emotion';
import * as Yup from 'yup';

const CATEGORIES: EmotionOption[] = [
  { value: { _id: '1', title: 'Натхнення' }, label: 'Натхнення' },
  { value: { _id: '2', title: 'Вдячність' }, label: 'Вдячність' },
  { value: { _id: '3', title: 'Тривога' }, label: 'Тривога' },
  { value: { _id: '4', title: 'Дивні бажання' }, label: 'Дивні бажання' },
  { value: { _id: '5', title: 'шось там 1' }, label: 'Нудота' },
  { value: { _id: '6', title: 'шось там 2' }, label: 'Тест' },
  { value: { _id: '7', title: 'шось там 3' }, label: 'Тест' },
  { value: { _id: '8', title: 'шось там 4' }, label: 'Тест' },
  { value: { _id: '9', title: 'шось там 5' }, label: 'Тест' },
];

interface AddDiaryEntryFormValues {
  title: string;
  categories: EmotionOption[];
  content: string;
}

const initialValues: AddDiaryEntryFormValues = {
  title: '',
  categories: [],
  content: '',
};

// Я б чесно перемістив це у окремий файл
const AddDiaryEntryFormSchema = Yup.object().shape({
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

const AddDiaryEntryForm = () => {
  const fieldId = useId();
  const handleSubmit = (
    values: AddDiaryEntryFormValues,
    actions: FormikHelpers<AddDiaryEntryFormValues>,
  ) => {
    console.log('Form values:', values);
    //TODO remove setSubmitting untill production
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <div className={css.formWrapper}>
      <h2 className={css.formTitle}>Новий запис</h2>

      <Formik validationSchema={AddDiaryEntryFormSchema} initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form className={css.form}>
            <label className={css.formLabel} htmlFor={`${fieldId}-title`}>
              Заголовок
            </label>
            <Field
              placeholder='Введіть заголовок запису'
              className={css.formField}
              type='text'
              id={`${fieldId}-title`}
              name='title'
              required
            />
            <ErrorMessage name='title' component='span' className={css.error} />

            <label className={css.formLabel}>Категорії:</label>
            <ReactSelect<EmotionOption, true>
              isMulti
              options={CATEGORIES}
              value={values.categories}
              onChange={(val) => setFieldValue('categories', val ?? [])}
              placeholder='Оберіть категорію'
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              menuPosition='fixed'
              components={{
                DropdownIndicator: CustomDropdownIndicator<Emotion, true>,
                Option: CheckboxOption,
                MultiValue: () => null,
                ClearIndicator: () => null,
              }}
              classNames={{
                control: ({ isFocused, menuIsOpen }) =>
                  [
                    css.selectControl,
                    (isFocused || menuIsOpen) && css.selectControlFocused,
                  ]
                    .filter(Boolean)
                    .join(' '),
                menu: () => css.selectMenu,
                menuList: () => css.selectMenuList,
                option: () => css.selectOption,
                placeholder: () => css.dropdownPlaceholder,
                valueContainer: () => css.selectValueContainer,
              }}
              unstyled
            />
            {values.categories.length > 0 && (
              <div className={css.dropdownTags}>
                {values !== null &&
                  values.categories.map((cat) => (
                    <span key={cat.value._id} className={css.tag}>
                      {cat.label}
                    </span>
                  ))}
              </div>
            )}
            <ErrorMessage name='categories' component='span' className={css.error} />

            <label className={css.formLabel} htmlFor={`${fieldId}-content`}>
              Запис:
            </label>
            <Field
              as='textarea'
              className={`${css.formField} ${css.textarea}`}
              id={`${fieldId}-content`}
              name='content'
              required
              placeholder='Запишіть, як ви себе відчуваєте'
            />
            <ErrorMessage name='content' component='span' className={css.error} />

            <button type='submit' className={css.submitButton}>
              Зберегти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddDiaryEntryForm;
