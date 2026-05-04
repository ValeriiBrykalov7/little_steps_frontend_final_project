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

export type CreateDiaryRequest = {
  title: string;
  description: string;
  emotions: string[];
};

export type UpdateDiaryRequest = Partial<CreateDiaryRequest>;

