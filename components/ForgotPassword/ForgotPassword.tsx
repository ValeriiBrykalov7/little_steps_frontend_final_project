'use client';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { requestResetEmail } from '@/lib/api/clientApi';

export default function ForgotPassword() {
  const handleSubmit = async (values: { email: string }) => {
    try {
      await requestResetEmail(values);

      toast.success('Якщо email вірний, лист вже летить до вас!');
    } catch (error) {
      toast.error('Щось пішло не так на сервері');
    }
  };

  return (
    <div>
      <h2>Відновлення доступу</h2>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          email: Yup.string().email().required(),
        })}
      >
        <Form>
          <Field name='email' type='email' placeholder='Введіть ваш email' />
          <button type='submit'>Надіслати лист</button>
        </Form>
      </Formik>
    </div>
  );
}
