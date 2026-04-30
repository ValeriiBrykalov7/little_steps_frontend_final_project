import { useAuthStore } from '@/lib/store/authStore';
import css from './GeetingBlock.module.css';

const GreetingBlock = () => {
  const { isAuthenticated, user } = useAuthStore();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'Доброго ранку';
    if (hour >= 12 && hour < 18) return 'Доброго дня';
    if (hour >= 18 && hour < 24) return 'Доброго вечора';
    return 'Доброї ночі';
  };

  return (
    <div className={`container ${css.greeting_block}`}>
      {' '}
      {isAuthenticated ? (
        <p className={css.greeting_text}>
          {getGreeting()}, {user?.username}!{' '}
        </p>
      ) : (
        <p className={css.greeting_text}>{getGreeting()}, гість!</p>
      )}
    </div>
  );
};
export default GreetingBlock;
