import { useState, useEffect, useCallback } from 'react';
import { tasksApi } from '../api/tasks';
import { Task, CreateTaskDTO } from '../types/task.types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await tasksApi.getAll();
      setTasks(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (data: CreateTaskDTO): Promise<void> => {
    setLoading(true);
    try {
      const response = await tasksApi.create(data);
      setTasks(prev => [response.data, ...prev]);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const retryTask = useCallback(async (id: number): Promise<void> => {
    setLoading(true);
    try {
      const response = await tasksApi.retry(id);
      setTasks(prev => prev.map(t => t.id === id ? response.data : t));
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, fetchTasks, createTask, retryTask };
};
