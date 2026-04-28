"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { nextServer } from "@/lib/api/api";
import Image from "next/image";
import styles from "./TaskReminderCard.module.css";
import { Task } from "@/types/task";

type FrontTask = {
  id: string;
  date: string;
  title: string;
  completed: boolean;
  group?: "today" | "week";
};

export default function TasksReminderCard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();

  const { data: tasks = [], isLoading } = useQuery<FrontTask[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await nextServer.get<Task[]>("/tasks/allTasks");
      return response.data.map((t) => ({
        id: t._id,
        title: t.name,
        completed: t.isDone,
        date: t.date,
      }));
    },
    enabled: isAuthenticated,
  });

  const toggleTaskMutation = useMutation({
    mutationFn: async ({ id, isDone }: { id: string; isDone: boolean }) => {
      return await nextServer.patch(`/tasks/update/${id}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleToggleTask = (id: string, currentStatus: boolean) => {
    toggleTaskMutation.mutate({ id, isDone: !currentStatus });
  };

  const handleAddTask = () => {
    if (!isAuthenticated) {
      router.push("/auth/register");
      return;
    }
    console.log("Open AddTaskModal");
  };

 
  const todayTasks = tasks.filter((task) => task.group === "today");
  const weekTasks = tasks.filter((task) => task.group === "week");
  const noGroupTasks = tasks.filter((task) => !task.group);
  const hasGroupedTasks = todayTasks.length > 0 || weekTasks.length > 0 || noGroupTasks.length > 0;

  const renderTask = (task: FrontTask) => (
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
           <Image 
            src="/public/images/add.svg" 
            alt="" 
            width={24} 
            height={24} 
            className={styles.addTaskIcon} 
            />
        </button>
      </div>

      {isLoading ? (
        <p>Завантаження...</p>
      ) : tasks.length === 0 ? (
        <div className={styles.tasksPlaceholder}>
          <div className={styles.noTasks}>
            <h4>Наразі немає жодних завдань</h4>
            <p>Створіть мерщій нове завдання!</p>
          </div>
          <button type="button" className={styles.createTaskButton} onClick={handleAddTask}>Створити завдання</button>
        </div>
      ) : (

        <>
          {todayTasks.length > 0 && <ul className={styles.tasksList}>{todayTasks.map(renderTask)}</ul>}
          {weekTasks.length > 0 && <ul className={styles.tasksList}>{weekTasks.map(renderTask)}</ul>}
          {noGroupTasks.length > 0 && <ul className={styles.tasksList}>{noGroupTasks.map(renderTask)}</ul>}
        </>
      )}
    </div>
  );
}