"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./TaskReminderCard.module.css";
import Image from "next/image";

type Task = {
  id: number;
  date: string;
  title: string;
  completed: boolean;
  group?: "today" | "week";
};

const useAuth = () => {
  // TODO: replace with real auth logic
  return {
    isAuth: true,
  };
};

const useUserTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      date: "22.07",
      title: "Записатися на другий плановий скринінг за 3 дні",
      completed: false,
      // group: "today",
    },
    {
      id: 2,
      date: "22.07",
      title: "Прийняти вітаміни для вагітних",
      completed: false,
      // group: "today",
    },
    {
      id: 3,
      date: "22.07",
      title: "Відвідати плановий скринінг",
      completed: false,
      // group: "week",
    },
  ]);

  // TODO: replace with user tasks module
  return {
    tasks,
    setTasks,
  };
};

export default function TasksReminderCard() {
  const router = useRouter();
  const { isAuth } = useAuth();
  //   const [tasks, setTasks] = useState<Task[]>([]);
  const { tasks, setTasks } = useUserTasks();

  const handleToggleTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const newStatus = !task.completed;
    const prevTasks = tasks;

    setTasks((currentTasks) =>
      currentTasks.map((t) =>
        t.id === id ? { ...t, completed: newStatus } : t,
      ),
    );

    try {
      // TODO: uncomment when tasks API is ready
      // const response = await fetch(`/api/tasks/${id}`, {
      //   method: "PATCH",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ completed: newStatus }),
      // });
      // if (!response.ok) {
      //   throw new Error("Failed to update task");
      // }
    } catch (error) {
      console.error("Помилка оновлення задачі", error);
      setTasks(prevTasks);
    }
  };

  const handleAddTask = () => {
    if (!isAuth) {
      router.push("/auth/register");
      return;
    }

    console.log("Open AddTaskModal"); // TODO: open AddTaskModal
  };

  const todayTasks = tasks.filter((task) => task.group === "today");
  const weekTasks = tasks.filter((task) => task.group === "week");
  const noGroupTasks = tasks.filter((task) => !task.group);

  const hasGroupedTasks = todayTasks.length > 0 || weekTasks.length > 0;

  const renderTask = (task: Task) => (
    <li className={styles.taskItem} key={task.id}>
      <div className={styles.taskContent}>
        <p className={styles.taskDate}>{task.date}</p>

        <label className={styles.taskRow}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleToggleTask(task.id)}
            className={styles.taskCheckbox}
          />

          <span className={styles.customCheckbox}></span>

          <p
            className={
              task.completed
                ? `${styles.taskText} ${styles.taskTextDone}`
                : styles.taskText
            }
          >
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

        <button
          type="button"
          className={styles.addTaskButton}
          onClick={handleAddTask}
        >
          {/* <img
            src="/icons/add.svg"
            alt="Add button"
            className={styles.addTaskIcon}
          /> */}

          <Image
  src="/icons/add.svg"
  alt="Add button"
  width={24}   // обов'язково для next/image
  height={24}  // обов'язково для next/image
  className={styles.addTaskIcon}
/>
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className={styles.tasksPlaceholder}>
          <div className={styles.placeholderTextBlock}>
            <p className={styles.placeholderTitle}>
              Наразі немає жодних завдань
            </p>
            <p className={styles.placeholderText}>Створіть мершій завдання!</p>
          </div>

          <button
            type="button"
            className={styles.createTaskButton}
            onClick={handleAddTask}
          >
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
              <ul className={styles.tasksList}>
                {noGroupTasks.map(renderTask)}
              </ul>
            </div>
          )}
        </>
      ) : (
        <ul className={styles.tasksList}>{tasks.map(renderTask)}</ul>
      )}
    </div>
  );
}