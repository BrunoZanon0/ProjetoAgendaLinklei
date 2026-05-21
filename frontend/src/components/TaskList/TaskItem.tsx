import React from 'react';
import { Task } from '../../types/task.types';

interface TaskItemProps {
  task: Task;
  onRetry: (id: number) => Promise<void>;
}

const statusConfig: Record<string, { bg: string; text: string; icon: string }> = {
  pending: { bg: 'bg-yellow-500', text: '⏳ Pendente', icon: '⏳' },
  processing: { bg: 'bg-blue-500', text: '⚙️ Processando', icon: '⚙️' },
  completed: { bg: 'bg-green-500', text: '✅ Concluída', icon: '✅' },
  failed: { bg: 'bg-red-500', text: '❌ Falha', icon: '❌' },
  retrying: { bg: 'bg-orange-500', text: '🔄 Retentando', icon: '🔄' },
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onRetry }) => {
  const config = statusConfig[task.status] || statusConfig.pending;

  return (
    <div className={`${config.bg} text-white rounded-lg p-4`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="font-bold text-lg">{task.name}</div>
          <div className="text-sm opacity-90">
            ID: {task.id} | Tipo: {task.type} | Prioridade: {task.priority === 'high' ? 'Alta' : 'Normal'}
          </div>
          <div className="text-sm font-semibold mt-1">{config.text}</div>
          {task.output && <div className="text-sm mt-1 bg-black bg-opacity-20 p-1 rounded">{task.output}</div>}
          {task.error_message && <div className="text-sm mt-1 text-red-200">{task.error_message}</div>}
        </div>
        {task.status === 'failed' && (
          <button
            onClick={() => onRetry(task.id)}
            className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm"
          >
            🔄 Tentar Novamente
          </button>
        )}
      </div>
    </div>
  );
};
