import React, { useState } from 'react';
import { CreateTaskDTO } from '../../types/task.types';

interface TaskFormProps {
  onCreateTask: (data: CreateTaskDTO) => Promise<void>;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onCreateTask }) => {
  const [formData, setFormData] = useState<CreateTaskDTO>({
    name: '',
    type: 'email',
    priority: 'high',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    setLoading(true);
    try {
      await onCreateTask(formData);
      setFormData({ ...formData, name: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">✨ Criar Nova Tarefa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Nome</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Tipo</label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
            disabled={loading}
          >
            <option value="email">📧 E-mail</option>
            <option value="report">📊 Relatório</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Prioridade</label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
            disabled={loading}
          >
            <option value="high">🔴 Alta</option>
            <option value="default">🟡 Normal</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 rounded-lg transition"
        >
          {loading ? '⏳ Criando...' : '🚀 Criar Tarefa'}
        </button>
      </form>
    </div>
  );
};
