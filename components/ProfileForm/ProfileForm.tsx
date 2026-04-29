'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Gender } from '@/types/user';
import { useProfileStore } from '@/lib/store/useProfileStore';

export const ProfileForm = () => {
  const queryClient = useQueryClient();
  const { formData, updateForm, resetProfile } = useProfileStore();

  const { mutate: saveProfile, isPending } = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await axios.patch('/api/user/me', data);
      return response.data;
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['currentUser'], updatedUser);
      // alert
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
            value={formData.name}
            onChange={(e) => updateForm({ name: e.target.value })}
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

        <div className='form-btn'>
          <button type='button' className='btn-cancel' onClick={resetProfile}>
            Відмінити зміни
          </button>

          <button
            type='button'
            className='btn-save'
            onClick={() => saveProfile(formData)}
            disabled={isPending}
          >
            {isPending ? 'Збереження...' : 'Зберегти зміни'}
          </button>
        </div>
      </form>
    </div>
  );
};
