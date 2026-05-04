import { components, OptionProps, GroupBase } from 'react-select';
import { EmotionOption } from '@/types/option';
import css from './EmotionOption.module.css';

type CheckboxOptionProps = OptionProps<EmotionOption, true, GroupBase<EmotionOption>>;

const CheckboxOption = (props: CheckboxOptionProps) => {
  const { isSelected, label } = props;
  return (
    <components.Option {...props}>
      <div className={`${css.option} ${isSelected ? css.optionChecked : ''}`}>
        <span className={css.checkmark} data-checked={isSelected}>
          {isSelected && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6L5 9L10 3"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <span className={css.dropdownItemLabel}>{label}</span>
      </div>
    </components.Option>
  );
};

export default CheckboxOption;