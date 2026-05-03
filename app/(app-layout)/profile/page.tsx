import { ProfileForm } from '@/components/ProfileForm/ProfileForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Налаштування профілю',
  description: 'Керуйте своїм профілем та оновлюйте особисту інформацію.',
  openGraph: {
    title: 'Налаштування профілю',
    description: 'Керуйте своїм профілем та оновлюйте особисту інформацію.',
    url: 'https://little-steps-kappa.vercel.app/',
    siteName: 'Лелека',
    images: [
      {
        url: '/images/meta-card.jpg',
        width: 1200,
        height: 630,
        alt: 'Прев’ю сторінки профілю',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
};

const Home = async () => {
  return (
    <div>
      <ProfileForm />
    </div>
  );
};

export default Home;
