import React, { useState } from 'react';
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
  const [showModal, setShowModal] = useState(false);

  const formatOutput = (output: string | null) => {
    if (!output) return null;
    try {
      const parsed = JSON.parse(output);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return output;
    }
  };

  const formattedOutput = formatOutput(task.output);

  return (
    <>
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

            {formattedOutput && (
              <div className="mt-3">
                <button
                  onClick={() => setShowModal(true)}
                  className="text-law-primary hover:underline text-sm flex items-center gap-1"
                >
                  📋 Ver detalhes completos
                </button>
              </div>
            )}
            
            {task.error_message && (
              <div className="mt-3 bg-red-100 p-3 rounded text-xs text-red-700">
                <strong>❌ Erro:</strong>
                <div className="mt-1">{task.error_message}</div>
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

      {/* Modal para mostrar detalhes completos */}
      {showModal && formattedOutput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b bg-law-primary text-white rounded-t-lg">
              <h3 className="text-lg font-semibold">📋 Detalhes da Tarefa</h3>
              <button onClick={() => setShowModal(false)} className="text-white hover:text-gray-200 text-xl">
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <strong className="text-law-primary">📌 Processo:</strong>
                  <p className="mt-1">#{task.id}</p>
                </div>
                <div>
                  <strong className="text-law-primary">📅 Data de criação:</strong>
                  <p className="mt-1">{new Date(task.created_at).toLocaleString('pt-BR')}</p>
                </div>
                <div>
                  <strong className="text-law-primary">🏷️ Título:</strong>
                  <p className="mt-1">{task.name}</p>
                </div>
                <div>
                  <strong className="text-law-primary">📧 Tipo:</strong>
                  <p className="mt-1">{task.type === 'email' ? 'Comunicação' : 'Documento'}</p>
                </div>
                <div>
                  <strong className="text-law-primary">⚡ Prioridade:</strong>
                  <p className="mt-1">{task.priority === 'high' ? 'Urgente' : 'Normal'}</p>
                </div>
                <div>
                  <strong className="text-law-primary">🔄 Status:</strong>
                  <p className="mt-1">{statusText(task.status)}</p>
                </div>
                {task.completed_at && (
                  <div>
                    <strong className="text-law-primary">✅ Data de conclusão:</strong>
                    <p className="mt-1">{new Date(task.completed_at).toLocaleString('pt-BR')}</p>
                  </div>
                )}
                {task.attempts > 0 && (
                  <div>
                    <strong className="text-law-primary">🔄 Tentativas:</strong>
                    <p className="mt-1">{task.attempts}</p>
                  </div>
                )}
              </div>
              
              <div className="mt-4">
                <strong className="text-law-primary text-lg">📄 Detalhes Completos:</strong>
                <pre className="mt-2 bg-gray-50 p-4 rounded-lg text-xs overflow-auto max-h-96 whitespace-pre-wrap border border-law-border">
                  {formattedOutput}
                </pre>
              </div>

              {task.error_message && (
                <div className="mt-4 bg-red-50 p-4 rounded-lg">
                  <strong className="text-law-error">❌ Mensagem de Erro:</strong>
                  <pre className="mt-2 text-sm text-red-700 whitespace-pre-wrap">{task.error_message}</pre>
                </div>
              )}
            </div>
            <div className="p-4 border-t flex justify-end bg-gray-50 rounded-b-lg">
              <button onClick={() => setShowModal(false)} className="law-btn-primary">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
