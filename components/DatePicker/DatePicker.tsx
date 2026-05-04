'use client';

import { useState } from 'react';
import { useFormikContext } from 'formik';
import ReactDatePicker from 'react-datepicker';
import styles from './DatePicker.module.css';
import clsx from 'clsx';
import Icon from '../Icon/Icon';

type DatePickerFormValues = {
  dueDate: Date | null;
};

interface DatePickerProps {
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export function DatePicker({ minDate, maxDate, className }: DatePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
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
        onCalendarOpen={() => setIsCalendarOpen(true)}
        onCalendarClose={() => setIsCalendarOpen(false)}
      />
      <Icon
        name='select-arrow'
        size={24}
        className={clsx(styles.arrow, {
          [styles.open]: isCalendarOpen,
        })}
      />
    </div>
  );
}
