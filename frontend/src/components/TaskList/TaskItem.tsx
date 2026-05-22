import React from 'react';
import { Task } from '../../types/task.types';

interface TaskItemProps {
  task: Task;
  onRetry: (id: number) => Promise<void>;
}

const statusClass = (status: string) => {
  switch(status) {
    case 'pending': return 'status-pending';
    case 'processing': return 'status-processing';
    case 'completed': return 'status-completed';
    case 'failed': return 'status-failed';
    case 'retrying': return 'status-retrying';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const statusText = (status: string) => {
  switch(status) {
    case 'pending': return '⏳ Pendente';
    case 'processing': return '⚙️ Processando';
    case 'completed': return '✅ Concluída';
    case 'failed': return '❌ Falha';
    case 'retrying': return '🔄 Tentando novamente';
    default: return status;
  }
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onRetry }) => {
  return (
    <div className={`${statusClass(task.status)} rounded-lg p-4 shadow-sm border`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="font-semibold text-law-primary text-lg">{task.name}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${task.priority === 'high' ? 'priority-high' : 'priority-default'}`}>
              {task.priority === 'high' ? '⚠️ Urgente' : '📋 Normal'}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-law-text-light mb-2">
            <span>{task.type === 'email' ? '📧 Comunicação' : '📄 Documento'}</span>
            <span>Processo #{task.id}</span>
            {task.attempts > 0 && <span>Tentativas: {task.attempts}</span>}
          </div>

          <div className="text-sm font-medium">{statusText(task.status)}</div>

          {task.output && (
            <div className="mt-2 bg-white bg-opacity-50 p-2 rounded text-xs">
              <strong>Detalhes:</strong> {task.output.substring(0, 150)}
              {task.output.length > 150 && '...'}
            </div>
          )}
          
          {task.error_message && (
            <div className="mt-2 bg-red-100 p-2 rounded text-xs text-red-700">
              <strong>Erro:</strong> {task.error_message}
            </div>
          )}
        </div>

        {task.status === 'failed' && (
          <button
            onClick={() => onRetry(task.id)}
            className="bg-law-accent hover:bg-opacity-90 text-white px-4 py-2 rounded-lg text-sm transition ml-4"
          >
            🔄 Reprocessar
          </button>
        )}
      </div>
    </div>
  );
};
