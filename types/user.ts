export type Gender = 'girl' | 'boy' | 'null';

export interface User {
  _id: string;
  name: string;
  email: string;
  gender?: Gender;
  dueDate?: string | null;
  photo?: string | null;
  createdAt: string;
  updatedAt: string;
}
