import Select, { StylesConfig } from 'react-select';
import { useFormikContext } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { FormValues } from '../OnboardingForm/OnboardingForm';
import CustomDropdownIndicator from '../CustomDropdownIndicator/CustomDropdownIndicator';
import { GenderOption } from '@/types/option';
import { Gender } from '@/types/user';

const MENU_ANIMATION_DURATION = 160;

const options: GenderOption[] = [
  { value: 'boy', label: 'Хлопчик' },
  { value: 'girl', label: 'Дівчинка' },
  { value: 'null', label: 'Ще не знаю' },
];

export default function GenderSelect() {
  const { values, setFieldValue, setFieldTouched } =
    useFormikContext<FormValues>();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const openMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setIsMenuClosing(false);
    setMenuIsOpen(true);
  };

  const closeMenu = () => {
    if (!menuIsOpen || isMenuClosing) return;

    setIsMenuClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setMenuIsOpen(false);
      setIsMenuClosing(false);
    }, MENU_ANIMATION_DURATION);
  };

  const customStyles: StylesConfig<GenderOption, false> = {
    container: (base) => ({
      ...base,
      width: '100%',
    }),

    control: (base, state) => ({
      ...base,
      width: '100%',
      minHeight: 40,
      height: 40,
      borderRadius: state.menuIsOpen ? '12px 12px 0 0' : 12,
      backgroundColor: '#f5f5f5',
      padding: '0px 12px',
      cursor: 'pointer',
      boxShadow: 'none',
      outline: 'none',
      border: '1px solid rgba(0, 0, 0, 0.15)',
      '&:hover': {
        border: '1px solid rgba(0, 0, 0, 0.15)',
      },
    }),

    valueContainer: (base) => ({
      ...base,
      padding: 0,
    }),

    placeholder: (base, state) => ({
      ...base,
      margin: 0,
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '1.5',
      color: state.selectProps.menuIsOpen ? '#000' : '#9e9e9e',
    }),

    singleValue: (base) => ({
      ...base,
      margin: 0,
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#000',
    }),

    indicatorSeparator: () => ({
      display: 'none',
    }),

    dropdownIndicator: (base) => ({
      ...base,
      padding: 0,
      marginLeft: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),

    menu: (base) => ({
      ...base,
      width: '100%',
      borderRadius: '0 0 12px 12px',
      borderTop: '1px solid rgba(0, 0, 0, 0.15)',
      marginTop: 0,
      boxShadow: 'none',
      border: '1px solid #cfcfcf',
      backgroundColor: '#f5f5f5',
      padding: '8px 0',
      overflow: 'hidden',
      transformOrigin: 'top center',
      pointerEvents: isMenuClosing ? 'none' : 'auto',
      animation: `${
        isMenuClosing ? 'genderSelectMenuClose' : 'genderSelectMenuOpen'
      } ${MENU_ANIMATION_DURATION}ms ease forwards`,
    }),

    menuList: (base) => ({
      ...base,
      padding: 0,
    }),

    option: (base, state) => ({
      ...base,
      width: '100%',
      margin: 0,
      padding: '12px 16px',
      borderRadius: 12,

      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#000',

      backgroundColor: state.isFocused ? 'rgba(0, 0, 0, 0.05)' : 'transparent',

      cursor: 'pointer',
    }),
  };

  return (
    <Select<GenderOption, false>
      options={options}
      value={options.find((o) => o.value === values.gender) ?? null}
      onChange={(option) => {
        setFieldValue('gender', option?.value ?? 'null');
        setFieldTouched('gender', true, false);
      }}
      menuIsOpen={menuIsOpen}
      onMenuOpen={openMenu}
      onMenuClose={closeMenu}
      placeholder='Оберіть стать'
      styles={customStyles}
      isSearchable={false}
      components={{
        DropdownIndicator: CustomDropdownIndicator<Gender, false>,
      }}
      instanceId='gender-select'
    />
  );
}
