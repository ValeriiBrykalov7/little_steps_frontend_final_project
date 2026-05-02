import { components, DropdownIndicatorProps } from 'react-select';
import { GenderOption } from '../OnboardingForm/OnboardingForm';
import Icon from '../Icon/Icon';
import styles from './CustomDropdownIndicator.module.css';

export default function CustomDropdownIndicator(
  props: DropdownIndicatorProps<GenderOption, false>,
) {
  const {
    selectProps: { menuIsOpen },
  } = props;

  return (
    <components.DropdownIndicator {...props}>
      <Icon
        name='select-arrow'
        size={24}
        className={`${styles.arrow} ${menuIsOpen ? styles.open : ''}`}
      />
    </components.DropdownIndicator>
  );
}
