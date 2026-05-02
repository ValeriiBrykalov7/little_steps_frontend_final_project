import type { Emotion } from './emotion';

export type DiaryEntry = {
  _id: string;
  title: string;
  description: string;
  emotions: Emotion[];
  userId?: string;
  date?: string;
  createdAt: string;
  updatedAt: string;
};

export type GetAllDiariesResponse = {
  diary: DiaryEntry[];
  allEmotions: Emotion[];
};

