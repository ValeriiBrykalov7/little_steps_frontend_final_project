import OnboardingForm from '@/components/OnboardingForm/OnboardingForm';
import { createPageMetadata } from '@/lib/helper/metadata';
import styles from './page.module.css';

export const metadata = createPageMetadata({
  title: 'Знайомство',
  description:
    'Заповніть базову інформацію профілю, щоб Лелека могла персоналізувати ваш досвід у додатку.',
  path: '/profile/edit',
  imageAlt: 'Лелека - знайомство з користувачем',
});

const OnBoardingPage = async () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Давайте познаймимось ближче</h1>
      <OnboardingForm />
    </div>
  );
};

export default OnBoardingPage;
