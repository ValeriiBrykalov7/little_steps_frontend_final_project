"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { nextServer } from "@/lib/api/clientApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./TaskReminderCard.module.css";

const useAuth = () => {

  return {
    isAuth: true, 
  };
};

type Task = {
  id: number;
  date: string;
  title: string;
  completed: boolean;
  group?: "today" | "week";
};

export default function TaskReminderCard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  

  const { isAuth } = useAuth();

  const { data: tasks = [], isLoading, error } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data } = await nextServer.get('/tasks/allTasks');
      return data;
    },
  });


  const mutation = useMutation({
    mutationFn: async ({ id, completed }: { id: number; completed: boolean }) => {
      await nextServer.patch(`/tasks/update/${id}`, { completed });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleToggleTask = (id: number, currentStatus: boolean) => {
    mutation.mutate({ id, completed: !currentStatus });
  };

  const handleAddTask = () => {
    if (!isAuth) {
      router.push("/auth/register");
      return;
    }
    console.log("Open AddTaskModal");
  };

  const todayTasks = tasks.filter((task) => task.group === "today");
  const weekTasks = tasks.filter((task) => task.group === "week");
  const noGroupTasks = tasks.filter((task) => !task.group);
  const hasGroupedTasks = todayTasks.length > 0 || weekTasks.length > 0;

  if (isLoading) return <div className={styles.tasksReminderCard}>Завантаження...</div>;
  if (error) return <div className={styles.tasksReminderCard}>Помилка завантаження.</div>;

  const renderTask = (task: Task) => (
    <li className={styles.taskItem} key={task.id}>
      <div className={styles.taskContent}>
        <p className={styles.taskDate}>{task.date}</p>
        <label className={styles.taskRow}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleToggleTask(task.id, task.completed)}
            className={styles.taskCheckbox}
          />
          <span className={styles.customCheckbox}></span>
          <p className={task.completed ? `${styles.taskText} ${styles.taskTextDone}` : styles.taskText}>
            {task.title}
          </p>
        </label>
      </div>
    </li>
  );

  return (
    <div className={styles.tasksReminderCard}>
      <div className={styles.tasksHeader}>
        <h2 className={styles.tasksTitle}>Важливі завдання</h2>
        <button type="button" className={styles.addTaskButton} onClick={handleAddTask}>
          <Image src="/icons/add.svg" alt="Add button" width={24} height={24} className={styles.addTaskIcon} />
        </button>
      </div>
      {}
      {tasks.length === 0 ? (
        <div className={styles.tasksPlaceholder}>
          <div className={styles.placeholderTextBlock}>
            <p className={styles.placeholderTitle}>Наразі немає жодних завдань</p>
            <p className={styles.placeholderText}>Створіть мершій завдання!</p>
          </div>
          <button type="button" className={styles.createTaskButton} onClick={handleAddTask}>
            Створити завдання
          </button>
        </div>
      ) : hasGroupedTasks ? (
        <>
          {todayTasks.length > 0 && (
            <div className={styles.tasksGroup}>
              <p className={styles.tasksGroupTitle}>Сьогодні:</p>
              <ul className={styles.tasksList}>{todayTasks.map(renderTask)}</ul>
            </div>
          )}
          {weekTasks.length > 0 && (
            <div className={styles.tasksGroup}>
              <p className={styles.tasksGroupTitle}>Найближчий тиждень:</p>
              <ul className={styles.tasksList}>{weekTasks.map(renderTask)}</ul>
            </div>
          )}
          {noGroupTasks.length > 0 && (
            <div className={styles.tasksGroup}>
              <ul className={styles.tasksList}>{noGroupTasks.map(renderTask)}</ul>
            </div>
          )}
        </>
      ) : (
        <ul className={styles.tasksList}>{tasks.map(renderTask)}</ul>
      )}
    </div>
  );
}