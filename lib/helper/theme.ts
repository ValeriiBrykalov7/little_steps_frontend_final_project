import type { Gender } from '@/types/user';

export const getThemeByGender = (gender?: Gender | null): Gender => {
  if (gender === 'boy' || gender === 'girl') {
    return gender;
  }

  return 'null';
};

export const applyTheme = (theme?: Gender | null) => {
  if (typeof document === 'undefined') return;

  document.documentElement.dataset.theme = getThemeByGender(theme);
};
