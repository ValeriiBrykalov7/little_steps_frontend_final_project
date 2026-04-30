'use client';
import * as yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Gender } from '@/types/user';
import { useProfileStore } from '@/lib/store/useProfileStore';
import { updateProfile } from '@/lib/api/clientApi';
import { yupToFormErrors } from 'formik';
import { profileSchema } from '@/lib/validation/FormShema';

export const ProfileForm = () => {
  const queryClient = useQueryClient();
  const { formData, updateForm, resetProfile } = useProfileStore();

  const { mutate: saveProfile, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['currentUser'], updatedUser);
      // alert
    },
  });

  const handleSave = async () => {
    try {
      await profileSchema.validate(formData, { abortEarly: false });

      saveProfile(formData);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        alert(err.inner[0].message);
      }
    }
  };

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
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? 'Збереження...' : 'Зберегти зміни'}
          </button>
        </div>
      </form>
    </div>
  );
};
