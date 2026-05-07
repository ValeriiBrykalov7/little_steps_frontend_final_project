'use client';

import { useState } from 'react';
import { useFormikContext } from 'formik';
import ReactDatePicker from 'react-datepicker';
import styles from './DatePicker.module.css';
import clsx from 'clsx';
import Icon from '@/components/common/Icon/Icon';

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
          setIsCalendarOpen(false);
        }}
        minDate={minDate}
        maxDate={maxDate}
        dateFormat='yyyy-MM-dd'
        placeholderText='Оберіть дату'
        className={clsx(styles.dateInput, className)}
        showPopperArrow={false}
        popperPlacement='bottom-start'
        open={isCalendarOpen}
        onInputClick={() => setIsCalendarOpen(true)}
        onClickOutside={() => setIsCalendarOpen(false)}
        onCalendarOpen={() => setIsCalendarOpen(true)}
        onCalendarClose={() => setIsCalendarOpen(false)}
      />
      <button
        type='button'
        className={styles.arrowButton}
        aria-label={isCalendarOpen ? 'Закрити календар' : 'Відкрити календар'}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
      >
        <Icon
          name='select-arrow'
          size={24}
          className={clsx(styles.arrow, {
            [styles.open]: isCalendarOpen,
          })}
        />
      </button>
    </div>
  );
}
