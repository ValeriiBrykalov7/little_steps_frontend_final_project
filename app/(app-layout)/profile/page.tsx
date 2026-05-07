import { ProfileForm } from '@/components/profile/ProfileForm/ProfileForm';
import { createPageMetadata } from '@/lib/helper/metadata';
import css from './page.module.css';

export const metadata = createPageMetadata({
  title: 'Налаштування профілю',
  description:
    'Керуйте своїм профілем, оновлюйте особисту інформацію, дату пологів і тему додатку Лелека.',
  path: '/profile',
  imageAlt: 'Лелека - налаштування профілю',
});

const Home = async () => {
  return (
    <div className={css.profilePage}>
      <ProfileForm />
    </div>
  );
};

export default Home;
