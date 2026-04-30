import Select, { StylesConfig } from 'react-select';
import { useFormikContext } from 'formik';
import { FormValues, GenderOption } from '../OnboardingForm/OnboardingForm';
import CustomDropdownIndicator from '../CustomDropdownIndicator/CustomDropdownIndicator';

const options: GenderOption[] = [
  { value: 'boy', label: 'Хлопчик' },
  { value: 'girl', label: 'Дівчинка' },
  { value: 'null', label: 'Ще не знаю' },
];

export default function GenderSelect() {
  const { values, setFieldValue, setFieldTouched } =
    useFormikContext<FormValues>();

  const customStyles: StylesConfig<GenderOption, false> = {
    control: (base, state) => ({
      ...base,
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
      borderRadius: '0 0 12px 12px',
      borderTop: '1px solid rgba(0, 0, 0, 0.15)',
      marginTop: 0,
      boxShadow: 'none',
      border: '1px solid #cfcfcf',
      backgroundColor: '#f5f5f5',
      padding: '8px 0',
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
    <Select
      options={options}
      value={values.gender}
      onChange={(option) => {
        setFieldValue('gender', option);
        setFieldTouched('gender', true, false);
      }}
      placeholder='Оберіть стать'
      styles={customStyles}
      isSearchable={false}
      components={{
        DropdownIndicator: CustomDropdownIndicator,
      }}
      instanceId='gender-select'
    />
  );
}
