import { useId } from 'react';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { components } from 'react-select';
import ReactSelect from 'react-select';
import css from './AddDiaryEntryForm.module.css';
import CustomDropdownIndicator from '../CustomDropdownIndicator/CustomDropdownIndicator';
import CheckboxOption from '../EmotionsOption/EmotionOption';
import { EmotionOption } from '@/types/option';
import { Emotion } from '@/types/emotion';
import { AddDiaryEntryFormSchema } from '@/lib/validation/AddDiaryEntryFormSchema';
import { useRef, useState, useEffect } from 'react';

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

const AddDiaryEntryForm = () => {
  const fieldId = useId();

  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(2);

useEffect(() => {
  if (!containerRef.current) return;

  const observer = new ResizeObserver((entries) => {
    const width = entries[0].contentRect.width;
    if (width < 450) setVisibleCount(2);
    else if (width < 950) setVisibleCount(4);
    else setVisibleCount(6);
  });

  observer.observe(containerRef.current);
  return () => observer.disconnect();
}, []);

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
    <div ref={containerRef} className={css.formWrapper}>
      <h2 className={css.formTitle}>Новий запис</h2>

      <Formik
        validationSchema={AddDiaryEntryFormSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
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
                ValueContainer: ({ children, ...props }) => (
                  <components.ValueContainer {...props}>
                    {values.categories.length > 0 ? (
                      <div className={css.dropdownTags} ref={containerRef}>
                        {values.categories.slice(0, visibleCount).map((cat) => (
                          <span key={cat.value._id} className={css.tag}>
                            {cat.label}
                          </span>
                        ))}
                        {values.categories.length > visibleCount && (
                          <span className={css.tag}>
                            +{values.categories.length - visibleCount}
                          </span>
                        )}
                      </div>
                    ) : (
                      children
                    )}
                  </components.ValueContainer>
                ),
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
            <ErrorMessage
              name='categories'
              component='span'
              className={css.error}
            />

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
            <ErrorMessage
              name='content'
              component='span'
              className={css.error}
            />

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
