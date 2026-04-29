export interface Task {
  _id: string;
  name: string;
  date: string;
  isDone: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateTaskRequest = {
  name: string;
  date: string;
};

export type UpdateTaskRequest = Partial<Pick<Task, 'name' | 'date' | 'isDone'>>;
