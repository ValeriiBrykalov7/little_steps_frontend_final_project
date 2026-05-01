import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

const backendURL = 'https://little-steps-final-project.onrender.com';
const baseURL = `${backendURL}/api`;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
