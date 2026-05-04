import { Gender } from "./user"
import { Emotion } from "./emotion"

export interface BaseOption<T>{
    value: T;
    label: string;
}

export type GenderOption = BaseOption<Gender>;
export type EmotionOption = BaseOption<Emotion>;