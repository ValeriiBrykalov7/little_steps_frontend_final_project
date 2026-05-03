import { create } from 'zustand';
import { Gender } from '@/types/user';

interface ProfileState {
  formData: {
    username: string;
    email: string;
    gender: Gender;
    dueDate: string | null;
  };

  updateForm: (data: Partial<ProfileState['formData']>) => void;
  resetProfile: () => void;
}

const initialState = {
  username: '',
  email: '',
  gender: 'null' as Gender,
  dueDate: null,
};

export const useProfileStore = create<ProfileState>((set) => ({
  formData: initialState,
  updateForm: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  resetProfile: () => set({ formData: initialState }),
}));
