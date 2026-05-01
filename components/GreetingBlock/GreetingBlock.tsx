// import { useAuthStore } from '@/lib/store/authStore';
// import css from './GeetingBlock.module.css';

// const GreetingBlock = () => {
//   const { isAuthenticated, user } = useAuthStore();

//   return (
//     <div className={`container ${css.greeting_block}`}>
//       {' '}
//       {isAuthenticated ? (
//          <p className={css.greeting_text}>
//         Доброго ранку, {user?.username ? (user.username.charAt(0).toUpperCase() + user.username.slice(1).toLowerCase()) : 'Гість'}!
//       </p>
//       ) : (
//         <p className={css.greeting_text}>Доброго ранку, гість!</p>
//       )}
//     </div>
//   );
// };
// export default GreetingBlock;

import { useAuthStore } from '@/lib/store/authStore';
import css from './GeetingBlock.module.css';

const getGreetingByTime = () => {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return 'Доброго ранку';
  if (hour >= 12 && hour < 18) return 'Доброго дня';
  if (hour >= 18 && hour < 24) return 'Доброго вечора';
  return 'Доброї ночі';
};

const formatName = (name?: string) => {
  if (!name) return 'Гість';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const GreetingBlock = () => {
  const { isAuthenticated, user } = useAuthStore();

  const greeting = getGreetingByTime();
  const username = formatName(user?.username);

  return (
    <div className={`container ${css.greeting_block}`}>
      {isAuthenticated ? (
        <p className={css.greeting_text}>
          {greeting}, {username}!
        </p>
      ) : (
        <p className={css.greeting_text}>{greeting}, гість!</p>
      )}
    </div>
  );
};

export default GreetingBlock;
