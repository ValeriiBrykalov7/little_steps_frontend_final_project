import { Emotion } from './emotion';

export type DiaryEntry = {
  _id: string;
  title: string;
  description: string;
  emotions: Emotion[];
  date?: string;
  createdAt: string;
  updatedAt: string;
};
