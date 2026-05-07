import { components, DropdownIndicatorProps } from 'react-select';
import { BaseOption } from '@/types/option';
import Icon from '@/components/common/Icon/Icon';
import styles from './CustomDropdownIndicator.module.css';
import clsx from 'clsx';

export default function CustomDropdownIndicator<
  T,
  IsMulti extends boolean = false,
>(props: DropdownIndicatorProps<BaseOption<T>, IsMulti>) {
  const {
    selectProps: { menuIsOpen },
  } = props;

  return (
    <components.DropdownIndicator {...props}>
      <Icon
        name='select-arrow'
        size={24}
        className={clsx(styles.arrow, {
          [styles.open]: menuIsOpen,
        })}
      />
    </components.DropdownIndicator>
  );
}
