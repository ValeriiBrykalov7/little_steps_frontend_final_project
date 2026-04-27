import { useAuthStore } from '@/lib/store/authStore';
import css from './GeetingBlock.module.css';

const GreetingBlock = () => {
  const { isAuthenticated, user } = useAuthStore();

  return <div className={`container ${css.greeting_block}`}> {isAuthenticated ? (
    
      <p className={css.greeting_text}>Доброго ранку,{user?.name}! </p>
   
  ) : (
    <p className={css.greeting_text}>Доброго ранку, гість!</p>
  )}
   </div>
};
export default GreetingBlock;
