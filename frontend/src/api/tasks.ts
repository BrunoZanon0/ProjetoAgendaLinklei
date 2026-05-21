import { api } from './client';
import { Task, CreateTaskDTO } from '../types/task.types';

export const tasksApi = {
  getAll: () => api.get<Task[]>('/tasks'),
  create: (data: CreateTaskDTO) => api.post<Task>('/tasks', data),
  retry: (id: number) => api.post<Task>(`/tasks/${id}/retry`),
};
