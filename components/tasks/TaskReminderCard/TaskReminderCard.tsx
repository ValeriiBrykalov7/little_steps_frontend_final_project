'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { getAllTasks, updateTask } from '@/lib/api/clientApi';
import styles from './TaskReminderCard.module.css';
import { Task } from '@/types/task';
import { Loader } from '@/components/common/Loader/Loader';

type TasksReminderCardProps = {
  openAddTaskModal?: () => void;
};

type ToggleTaskPayload = {
  taskId: string;
  isDone: boolean;
};

type ToggleTaskContext = {
  previousTasks?: Task[];
};

// Це функція для форматування дати таски у вигляді 01.01, а не 2026-01-01, що приходить з серваку
const formatTaskDate = (date: string) => {
  const [year, month, day] = date.split('-');

  if (!year || !month || !day) return date;

  return `${day}.${month}`;
};

export default function TasksReminderCard({
  openAddTaskModal,
}: TasksReminderCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated, isAuthChecked } = useAuthStore();

  // Тут ми отримуємо всі завдання користувача, якщо він автентифікований. Якщо ні то масив завдань буде порожні
  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ['tasks', isAuthenticated],
    queryFn: getAllTasks,
    enabled: isAuthChecked && isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // Також тут у мутаціїї використовується optimistic update(для чекбоксів) тому код виглядає реально сумбурно. Але погугліть і пчочитайте що це. Я так зрозумів, що це реально стандарт
  const toggleTaskMutation = useMutation({
    mutationFn: ({ taskId, isDone }: ToggleTaskPayload) => {
      return updateTask(taskId, { isDone });
    },
    onMutate: async ({ taskId, isDone }) => {
      const queryKey = ['tasks', isAuthenticated];

      await queryClient.cancelQueries({ queryKey });

      const previousTasks = queryClient.getQueryData<Task[]>(queryKey);

      queryClient.setQueryData<Task[]>(queryKey, (currentTasks = []) =>
        currentTasks.map((task) =>
          task._id === taskId ? { ...task, isDone } : task,
        ),
      );

      return { previousTasks };
    },
    onError: (_error, _variables, context: ToggleTaskContext | undefined) => {
      queryClient.setQueryData(
        ['tasks', isAuthenticated],
        context?.previousTasks,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', isAuthenticated] });
    },
  });

  const handleToggleTask = (id: string, currentStatus: boolean) => {
    toggleTaskMutation.mutate({ taskId: id, isDone: !currentStatus });
  };

  const handleAddTask = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
      return;
    }

    openAddTaskModal?.();
  };

  const renderTask = (task: Task) => (
    <li className={styles.taskItem} key={task._id}>
      <div className={styles.taskContent}>
        <p className={styles.taskDate}>{formatTaskDate(task.date)}</p>
        <label className={styles.taskRow}>
          <input
            type='checkbox'
            checked={task.isDone}
            onChange={() => handleToggleTask(task._id, task.isDone)}
            className={styles.taskCheckbox}
          />
          <span className={styles.customCheckbox}></span>
          <p
            className={
              task.isDone
                ? `${styles.taskText} ${styles.taskTextDone}`
                : styles.taskText
            }
          >
            {task.name}
          </p>
        </label>
      </div>
    </li>
  );

  return (
    <div className={styles.tasksReminderCard}>
      <div className={styles.tasksHeader}>
        <h2 className={styles.tasksTitle}>Важливі завдання</h2>
        <button
          type='button'
          className={styles.addTaskButton}
          onClick={handleAddTask}
        >
          <svg
            className={styles.addTaskIcon}
            width='24'
            height='24'
            aria-hidden='true'
          >
            <use href='/sprite.svg#icon-create'></use>
          </svg>
        </button>
      </div>

      {isLoading ? (
        <Loader variant='inline' />
      ) : tasks.length === 0 ? (
        <div className={styles.tasksPlaceholder}>
          <div className={styles.noTasks}>
            <h4 className={styles.textTitle}>Наразі немає жодних завдань</h4>
            <p className={styles.texttasks}>Створіть мерщій нове завдання!</p>
          </div>
          <button
            type='button'
            className={`pink ${styles.createTaskButton}`}
            onClick={handleAddTask}
          >
            Створити завдання
          </button>
        </div>
      ) : (
        <ul className={styles.tasksList}>{sortedTasks.map(renderTask)}</ul>
      )}
    </div>
  );
}
