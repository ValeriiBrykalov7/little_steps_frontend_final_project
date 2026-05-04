'use client';

import { useId } from 'react';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { components } from 'react-select';
import ReactSelect from 'react-select';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import css from './AddDiaryEntryForm.module.css';
import CustomDropdownIndicator from '../CustomDropdownIndicator/CustomDropdownIndicator';
import CheckboxOption from '../EmotionsOption/EmotionOption';
import { EmotionOption } from '@/types/option';
import { Emotion } from '@/types/emotion';
import { AddDiaryEntryFormSchema } from '@/lib/validation/AddDiaryEntryFormSchema';
import { useRef, useState, useEffect } from 'react';
import { createDiary, getAllDiaries } from '@/lib/api/clientApi';
import type { CreateDiaryRequest, GetAllDiariesResponse } from '@/types/diary';
import { useAuthStore } from '@/lib/store/authStore';
import { Loader } from '../Loader/Loader';
import toast from 'react-hot-toast';

type AddDiaryEntryFormProps = {
  onClose: () => void;
};

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

const AddDiaryEntryForm = ({ onClose }: AddDiaryEntryFormProps) => {
  const fieldId = useId();
  const { isAuthenticated, isAuthChecked } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: diaryData, isLoading: isEmotionsLoading } =
    useQuery<GetAllDiariesResponse>({
      queryKey: ['diaries', isAuthenticated],
      queryFn: getAllDiaries,
      enabled: isAuthChecked && isAuthenticated,
      staleTime: 1000 * 60 * 5,
    });

  const createDiaryMutation = useMutation({
    mutationFn: createDiary,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['diaries'] });
    },
  });

  const availableEmotions = diaryData?.allEmotions ?? [];
  const emotionOptions: EmotionOption[] = availableEmotions.map((emotion) => ({
    value: emotion,
    label: emotion.title,
  }));

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

  const handleSubmit = async (
    values: AddDiaryEntryFormValues,
    { resetForm }: FormikHelpers<AddDiaryEntryFormValues>,
  ) => {
    try {
      if (values.categories.length === 0) {
        toast.error('Оберіть хоча б одну емоцію');
        return;
      }

      const newDiary: CreateDiaryRequest = {
        title: values.title.trim(),
        description: values.content.trim(),
        emotions: values.categories.map((category) => category.value._id),
      };

      await createDiaryMutation.mutateAsync(newDiary);

      resetForm();
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Не вдалося зберегти запис',
      );
    }
  };

  return (
    <div ref={containerRef} className={css.formWrapper}>
      <Formik
        validationSchema={AddDiaryEntryFormSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({
          values,
          setFieldValue,
          setFieldTouched,
          isSubmitting,
          errors,
          touched,
        }) => (
          <Form className={css.form} noValidate>
            <div className={css.fieldWrapper}>
              <label className={css.formLabel} htmlFor={`${fieldId}-title`}>
                Заголовок
              </label>
              <Field
                placeholder='Введіть заголовок запису'
                className={`${css.formField} ${
                  errors.title && touched.title ? css.inputError : ''
                }`}
                type='text'
                id={`${fieldId}-title`}
                name='title'
                disabled={isSubmitting}
              />
              <ErrorMessage
                name='title'
                component='span'
                className={css.error}
              />
            </div>

            <div className={css.fieldWrapper}>
              <label className={css.formLabel}>Категорії:</label>
              <ReactSelect<EmotionOption, true>
                isMulti
                isDisabled={isSubmitting || isEmotionsLoading}
                options={emotionOptions}
                value={values.categories}
                onChange={(val) => {
                  setFieldValue('categories', val ?? [], true);
                  setFieldTouched('categories', true, false);
                }}
                placeholder={
                  isEmotionsLoading
                    ? 'Завантажуємо емоції'
                    : 'Оберіть категорію'
                }
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  DropdownIndicator: CustomDropdownIndicator<Emotion, true>,
                  Option: CheckboxOption,
                  MultiValue: () => null,
                  ClearIndicator: () => null,
                  ValueContainer: ({ children, ...props }) => (
                    <components.ValueContainer {...props}>
                      {values.categories.length > 0 ? (
                        <div className={css.dropdownTags} ref={containerRef}>
                          {values.categories
                            .slice(0, visibleCount)
                            .map((cat) => (
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
                  container: () => css.selectContainer,
                  control: ({ isFocused, menuIsOpen }) =>
                    [
                      css.selectControl,
                      isFocused && css.selectControlFocused,
                      menuIsOpen && css.selectControlOpen,
                      errors.categories && touched.categories
                        ? css.inputError
                        : '',
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
            </div>

            <div className={css.fieldWrapper}>
              <label className={css.formLabel} htmlFor={`${fieldId}-content`}>
                Запис:
              </label>
              <Field
                as='textarea'
                className={`${css.formField} ${css.textarea} ${
                  errors.content && touched.content ? css.inputError : ''
                }`}
                id={`${fieldId}-content`}
                name='content'
                disabled={isSubmitting}
                placeholder='Запишіть, як ви себе відчуваєте'
              />
              <ErrorMessage
                name='content'
                component='span'
                className={css.error}
              />
            </div>

            <button
              type='submit'
              className={css.submitButton}
              disabled={isSubmitting}
              onClick={() => {
                const isTitleEmpty = values.title.trim().length === 0;
                const isContentEmpty = values.content.trim().length === 0;
                const isCategoriesEmpty = values.categories.length === 0;

                if (isTitleEmpty) {
                  setFieldTouched('title', true);
                }

                if (isContentEmpty) {
                  setFieldTouched('content', true);
                }

                if (isCategoriesEmpty) {
                  setFieldTouched('categories', true);
                }

                if (isTitleEmpty && isContentEmpty) {
                  toast.error('Заповніть заголовок і запис');
                  return;
                }

                if (isTitleEmpty) {
                  toast.error('Заповніть заголовок');
                  return;
                }

                if (isContentEmpty) {
                  toast.error('Заповніть запис');
                  return;
                }

                if (isCategoriesEmpty) {
                  toast.error('Оберіть хоча б одну емоцію');
                }
              }}
            >
              {isSubmitting ? <Loader variant='button' /> : 'Зберегти'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddDiaryEntryForm;
