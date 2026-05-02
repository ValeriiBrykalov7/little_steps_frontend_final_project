'use client';

import { useFormikContext } from 'formik';
import ReactDatePicker from 'react-datepicker';
import { FormValues } from '../OnboardingForm/OnboardingForm';
import styles from './DatePicker.module.css';
import { useState } from 'react';
import clsx from 'clsx';

interface DatePickerProps {
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export function DatePicker({ minDate, maxDate, className }: DatePickerProps) {
  const { values, setFieldValue, setFieldTouched } =
    useFormikContext<FormValues>();
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

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
        renderDayContents={(day, date) => (
          <div
            onMouseEnter={() => setHoverDate(date)}
            onMouseLeave={() => setHoverDate(null)}
          >
            {day}
          </div>
        )}
        value={
          hoverDate
            ? `${String(hoverDate.getDate()).padStart(2, '0')}.${String(
                hoverDate.getMonth() + 1,
              ).padStart(2, '0')}.${hoverDate.getFullYear()}`
            : undefined
        }
      />
    </div>
  );
}
