import OnboardingForm from '@/components/OnboardingForm/OnboardingForm';
import styles from './page.module.css';

const OnBoardingPage = async () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Давайте познаймимось ближче</h1>
      <OnboardingForm />
    </div>
  );
};

export default OnBoardingPage;
