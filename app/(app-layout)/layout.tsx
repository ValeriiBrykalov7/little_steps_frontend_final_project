import Sidebar from '@/components/Sidebar/Sidebar';
import styles from './layout.module.css';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.shell}>
      <Sidebar/>  
      <main className={`container ${styles.content}`}>
        <div className='container'>
          <Breadcrumbs />
        </div>      
          {children}
      </main>
    </div>
  );
}
