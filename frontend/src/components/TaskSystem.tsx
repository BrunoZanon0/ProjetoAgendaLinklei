import React, { useEffect } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useMetrics } from '../hooks/useMetrics';
import { TaskForm } from './TaskForm/TaskForm';
import { TaskList } from './TaskList/TaskList';
import { Metrics } from './Metrics/Metrics';

export const TaskSystem: React.FC = () => {
  const { tasks, createTask, retryTask, fetchTasks } = useTasks();
  const { metrics, fetchMetrics } = useMetrics();

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTasks();
      fetchMetrics();
    }, 3000);
    return () => clearInterval(interval);
  }, [fetchTasks, fetchMetrics]);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TaskForm onCreateTask={createTask} />
        <Metrics metrics={metrics} />
      </div>
      <TaskList tasks={tasks} onRetry={retryTask} />
    </div>
  );
};
