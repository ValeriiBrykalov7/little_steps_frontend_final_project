'use client';

import { useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import { FormValues } from '../OnboardingForm/OnboardingForm';
import styles from './DueDatePicker.module.css';
import { useState } from 'react';
import { max, min } from '@/lib/helper/date';

export function DueDatePicker() {
  const { values, setFieldValue, setFieldTouched } =
    useFormikContext<FormValues>();
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  return (
    <div className={styles.dateWrapper}>
      <DatePicker
        onKeyDown={(e) => e.preventDefault()}
        wrapperClassName={styles.datePickerWrapper}
        selected={values.dueDate}
        onChange={(date: Date | null) => {
          setFieldValue('dueDate', date);
          setFieldTouched('dueDate', true);
        }}
        minDate={min}
        maxDate={max}
        dateFormat='yyyy-MM-dd'
        placeholderText='Оберіть дату'
        className={styles.dateInput}
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
