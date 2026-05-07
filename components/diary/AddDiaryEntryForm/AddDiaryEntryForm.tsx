'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { components } from 'react-select';
import ReactSelect from 'react-select';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import css from './AddDiaryEntryForm.module.css';
import CustomDropdownIndicator from '@/components/common/CustomDropdownIndicator/CustomDropdownIndicator';
import CheckboxOption from '../EmotionsOption/EmotionOption';
import { EmotionOption } from '@/types/option';
import { Emotion } from '@/types/emotion';
import { AddDiaryEntryFormSchema } from '@/lib/validation/AddDiaryEntryFormSchema';
import { createDiary, getAllDiaries, updateDiary } from '@/lib/api/clientApi';
import type {
  CreateDiaryRequest,
  DiaryEntry,
  GetAllDiariesResponse,
  UpdateDiaryRequest,
} from '@/types/diary';
import { useAuthStore } from '@/lib/store/authStore';
import { Loader } from '@/components/common/Loader/Loader';
import toast from 'react-hot-toast';

type AddDiaryEntryFormProps = {
  entry?: DiaryEntry;
  onClose: () => void;
};

const SELECT_MENU_ANIMATION_DURATION = 160;

interface AddDiaryEntryFormValues {
  title: string;
  categories: EmotionOption[];
  content: string;
}

const AddDiaryEntryForm = ({ entry, onClose }: AddDiaryEntryFormProps) => {
  const fieldId = useId();
  const { isAuthenticated, isAuthChecked } = useAuthStore();
  const queryClient = useQueryClient();
  const isEditing = Boolean(entry);

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

  const updateDiaryMutation = useMutation({
    mutationFn: ({
      entryId,
      payload,
    }: {
      entryId: string;
      payload: UpdateDiaryRequest;
    }) => updateDiary(entryId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['diaries'] });
    },
  });

  const availableEmotions = diaryData?.allEmotions ?? [];
  const emotionOptions: EmotionOption[] = availableEmotions.map((emotion) => ({
    value: emotion,
    label: emotion.title,
  }));
  const formInitialValues = useMemo<AddDiaryEntryFormValues>(
    () => ({
      title: entry?.title ?? '',
      categories:
        entry?.emotions.map((emotion) => ({
          value: emotion,
          label: emotion.title,
        })) ?? [],
      content: entry?.description ?? '',
    }),
    [entry],
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [visibleCount, setVisibleCount] = useState(2);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

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

  const openMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setIsMenuClosing(false);
    setMenuIsOpen(true);
  };

  const closeMenu = useCallback(() => {
    if (!menuIsOpen || isMenuClosing) return;

    setIsMenuClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setMenuIsOpen(false);
      setIsMenuClosing(false);
    }, SELECT_MENU_ANIMATION_DURATION);
  }, [isMenuClosing, menuIsOpen]);

  useEffect(() => {
    if (!menuIsOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (selectRef.current?.contains(event.target as Node)) return;

      closeMenu();
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [closeMenu, menuIsOpen]);

  const handleSubmit = async (
    values: AddDiaryEntryFormValues,
    { resetForm }: FormikHelpers<AddDiaryEntryFormValues>,
  ) => {
    try {
      if (values.categories.length === 0) {
        toast.error('Оберіть хоча б одну емоцію');
        return;
      }

      if (values.categories.length > 12) {
        toast.error(`Оберіть не більше 12 емоцій`);
        return;
      }

      const diaryPayload: CreateDiaryRequest = {
        title: values.title.trim(),
        description: values.content.trim(),
        emotions: values.categories.map((category) => category.value._id),
      };

      if (entry) {
        await updateDiaryMutation.mutateAsync({
          entryId: entry._id,
          payload: diaryPayload,
        });
      } else {
        await createDiaryMutation.mutateAsync(diaryPayload);
      }

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
        initialValues={formInitialValues}
        enableReinitialize
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
              <div ref={selectRef}>
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
                  menuIsOpen={menuIsOpen}
                  onMenuOpen={openMenu}
                  onMenuClose={closeMenu}
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
                    menu: () =>
                      [
                        css.selectMenu,
                        isMenuClosing
                          ? css.selectMenuClosing
                          : css.selectMenuOpening,
                      ].join(' '),
                    menuList: () => css.selectMenuList,
                    option: () => css.selectOption,
                    placeholder: () => css.dropdownPlaceholder,
                    valueContainer: () => css.selectValueContainer,
                  }}
                  unstyled
                />
              </div>
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
              className={`${css.submitButton} pink`}
              disabled={
                isSubmitting ||
                createDiaryMutation.isPending ||
                updateDiaryMutation.isPending
              }
              onClick={() => {
                const isTitleEmpty = values.title.trim().length === 0;
                const isContentEmpty = values.content.trim().length === 0;
                const isCategoriesEmpty = values.categories.length === 0;
                const hasTooManyCategories = values.categories.length > 12;

                if (isTitleEmpty) {
                  setFieldTouched('title', true);
                }

                if (isContentEmpty) {
                  setFieldTouched('content', true);
                }

                if (isCategoriesEmpty || hasTooManyCategories) {
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
                  return;
                }

                if (hasTooManyCategories) {
                  toast.error(`Оберіть не більше 12 емоцій`);
                }
              }}
            >
              {isSubmitting ||
              createDiaryMutation.isPending ||
              updateDiaryMutation.isPending ? (
                <Loader variant='button' />
              ) : isEditing ? (
                'Зберегти зміни'
              ) : (
                'Зберегти'
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddDiaryEntryForm;
