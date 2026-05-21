import React from 'react';
import { Task } from '../../types/task.types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onRetry: (id: number) => Promise<void>;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onRetry }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">📝 Tarefas</h2>
        <div className="text-center py-8 text-gray-500">Nenhuma tarefa criada ainda</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">📝 Tarefas ({tasks.length})</h2>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onRetry={onRetry} />
        ))}
      </div>
    </div>
  );
};
