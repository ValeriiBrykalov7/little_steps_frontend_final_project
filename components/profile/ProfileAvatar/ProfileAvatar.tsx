'use client';

import { useEffect, useState } from 'react';
import {
  ErrorMessage,
  Form,
  Formik,
  useFormikContext,
  type FormikHelpers,
} from 'formik';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import styles from './ProfileAvatar.module.css';
import { updateAvatar } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { Loader } from '@/components/common/Loader/Loader';

type ProfileAvatarFormValues = {
  avatar: File | null;
};

type ProfileAvatarFieldsProps = {
  avatarUrl?: string | null;
  username?: string;
  email?: string;
  isPending: boolean;
};

const initialValues: ProfileAvatarFormValues = {
  avatar: null,
};

const validationSchema = Yup.object({
  avatar: Yup.mixed<File>()
    .nullable()
    .required('Оберіть фото для завантаження'),
});

const ProfileAvatarFields = ({
  avatarUrl,
  username,
  email,
  isPending,
}: ProfileAvatarFieldsProps) => {
  const { values, setFieldValue, setFieldTouched, submitForm } =
    useFormikContext<ProfileAvatarFormValues>();
  const [preview, setPreview] = useState<string | null>(avatarUrl ?? null);
  const imageSrc =
    values.avatar && preview
      ? preview
      : avatarUrl || '/images/default-avatar.png';

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    multiple: false,
    accept: { 'image/*': [] },
    noClick: true,
    disabled: isPending,
    onDrop: async (files) => {
      const file = files[0];

      if (!file) return;

      await setFieldValue('avatar', file, true);
      await setFieldTouched('avatar', true, false);

      setPreview((currentPreview) => {
        if (currentPreview?.startsWith('blob:')) {
          URL.revokeObjectURL(currentPreview);
        }

        return URL.createObjectURL(file);
      });

      await submitForm();
    },
  });

  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <Form className={styles.wrapper}>
      <div
        {...getRootProps()}
        className={`${styles.circle} ${isDragActive ? styles.active : ''}`}
      >
        <input {...getInputProps()} />
        <Image
          src={imageSrc}
          alt={username ? `Аватар користувача ${username}` : 'Аватар'}
          width={132}
          height={132}
          className={styles.image}
          unoptimized
        />
      </div>

      <div className={styles.info}>
        <h2 className={styles.name}>{username}</h2>
        <p className={styles.email}>{email}</p>

        <div className={styles.actions}>
          <button
            type='button'
            className={`${styles.button} gray`}
            onClick={open}
            disabled={isPending}
          >
            {isPending ? <Loader variant='button' /> : 'Завантажити нове фото'}
          </button>
        </div>

        <ErrorMessage name='avatar' component='span' className={styles.error} />
      </div>
    </Form>
  );
};

export default function ProfileAvatar() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [isPending, setIsPending] = useState(false);

  if (!user) return null;

  const handleSubmit = async (
    values: ProfileAvatarFormValues,
    { resetForm }: FormikHelpers<ProfileAvatarFormValues>,
  ) => {
    if (!values.avatar || isPending) return;

    setIsPending(true);

    try {
      const avatar = await updateAvatar(values.avatar);

      setUser({ ...user, avatar });
      resetForm();
      toast.success('Фото профілю оновлено');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Не вдалося оновити фото',
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <ProfileAvatarFields
        avatarUrl={user.avatar}
        username={user.username}
        email={user.email}
        isPending={isPending}
      />
    </Formik>
  );
}
