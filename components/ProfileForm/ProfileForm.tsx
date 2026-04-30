'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Gender, User } from '@/types/user';
import { useProfileStore } from '@/lib/store/useProfileStore';
import { updateProfile } from '@/lib/api/clientApi';
import { profileSchema } from '@/lib/validation/FormShema';
import { useAuthStore } from '@/lib/store/authStore';
import { Loader } from '../Loader/Loader';

const getCleanData = (data: Partial<User>): Partial<User> => {
  const cleanData: Partial<User> = {};

  if (data.username?.trim()) cleanData.username = data.username.trim();
  if (data.email?.trim()) cleanData.email = data.email.trim();
  if (data.gender && data.gender !== 'null')
    cleanData.gender = data.gender as Gender;
  if (data.dueDate) cleanData.dueDate = data.dueDate;

  return cleanData;
};

export const ProfileForm = () => {
  const queryClient = useQueryClient();
  const { formData, updateForm, resetProfile } = useProfileStore();

  const setUser = useAuthStore((state) => state.setUser);

  const { mutate: saveProfile, isPending } = useMutation<
    User,
    Error,
    Partial<User>
  >({
    mutationFn: async (data: Partial<User>) => {
      const payload = getCleanData(data);

      if (Object.keys(payload).length > 0) {
        await profileSchema.validate(payload, { abortEarly: false });
      } else {
        alert('Ви не ввели жодних даних');
        return Promise.reject('Empty');
      }

      return updateProfile(payload);
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['currentUser'], updatedUser);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });

      setUser(updatedUser);

      resetProfile();
      alert('Дані успішно змінено!');
    },
  });

  return (
    <div className='form-wrapper'>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='form-field'>
          <label htmlFor='name'>{"Ім'я"}</label>
          <input
            id='name'
            type='text'
            value={formData.username}
            onChange={(e) => updateForm({ username: e.target.value })}
            placeholder="Введіть ім'я"
          />
        </div>

        <div className='form-field'>
          <label htmlFor='email'>Пошта</label>
          <input
            id='email'
            type='email'
            value={formData.email}
            onChange={(e) => updateForm({ email: e.target.value })}
            placeholder='example@mail.com'
          />
        </div>

        <div className='form-field'>
          <label htmlFor='gender'>Стать дитини</label>
          <select
            id='gender'
            value={formData.gender}
            onChange={(e) => updateForm({ gender: e.target.value as Gender })}
          >
            <option value='null'>Оберіть стать</option>
            <option value='boy'>Хлопчик</option>
            <option value='girl'>Дівчинка</option>
          </select>
        </div>

        <div className='form-field'>
          <label htmlFor='dueDate'>Планова дата пологів</label>
          <input
            id='dueDate'
            type='date'
            value={formData.dueDate || ''}
            onChange={(e) => updateForm({ dueDate: e.target.value })}
          />
        </div>

        <div className='btn-cncl'>
          <button type='button' className='btn-cancel' onClick={resetProfile}>
            Відмінити зміни
          </button>

          <button
            type='button'
            className='btn-save'
            onClick={() => saveProfile(formData)}
            disabled={isPending}
          >
            {isPending} ? <Loader />
          </button>
        </div>
      </form>
    </div>
  );
};
