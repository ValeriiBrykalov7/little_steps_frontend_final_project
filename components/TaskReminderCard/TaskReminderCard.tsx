'use client'; // Обов'язково додайте це зверху, бо ми використовуємо хуки
import { useState, useEffect } from 'react';
import { nextServer } from '@/lib/api/api'; // Шлях до вашого api.ts
import { Task } from '@/types/task';
import styles from './TaskReminderCard.module.css';

export const TaskReminderCard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Робимо запит до бекенду
    nextServer.get('/tasks') // Перевірте, чи саме такий у вас ендпоінт
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error("Помилка при завантаженні завдань:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Завантаження...</div>;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Важливі завдання</h2>
        <button className={styles.addButton}>+</button>
      </div>
      
      {tasks.length === 0 ? (
        <div className={styles.emptyState}>
          <p>Наразі активних завдань немає</p>
        </div>
      ) : (
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <li key={task._id} className={styles.taskItem}>
              <input type="checkbox" checked={task.isDone} readOnly />
              <span>{task.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};