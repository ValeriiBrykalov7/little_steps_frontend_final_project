
import { useAuthStore } from "@/lib/store/authStore"
import css from './GeetingBlock.module.css'
const GreetingBlock = () => {

   const {isAuthenticated, user}=useAuthStore();

    return isAuthenticated ? (<div className={css.greeting_block}>
            <p className={css.greeting}>Hello,{user?.name} </p>
            </div>) : (<p className={css.greeting}>Hello, guest</p>)
}
export default GreetingBlock;