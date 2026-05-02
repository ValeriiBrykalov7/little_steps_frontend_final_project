'use client';

import { useFormikContext } from 'formik';
import ReactDatePicker from 'react-datepicker';
import styles from './DatePicker.module.css';
import clsx from 'clsx';

type DatePickerFormValues = {
  dueDate: Date | null;
};

interface DatePickerProps {
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export function DatePicker({ minDate, maxDate, className }: DatePickerProps) {
  const { values, setFieldValue, setFieldTouched } =
    useFormikContext<DatePickerFormValues>();

  return (
    <div className={styles.dateWrapper}>
      <ReactDatePicker
        wrapperClassName={styles.datePickerWrapper}
        selected={values.dueDate}
        onChange={(date: Date | null) => {
          setFieldValue('dueDate', date);
          setFieldTouched('dueDate', true);
        }}
        minDate={minDate}
        maxDate={maxDate}
        dateFormat='yyyy-MM-dd'
        placeholderText='Оберіть дату'
        className={clsx(styles.dateInput, className)}
        showPopperArrow={false}
        popperPlacement='bottom-start'
      />
    </div>
  );
}
