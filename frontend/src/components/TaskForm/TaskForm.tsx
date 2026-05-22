import React, { useState } from 'react';
import { CreateTaskDTO } from '../../types/task.types';
import { FileText, Mail, Gavel, Clock } from 'lucide-react';

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
    <div className="law-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-law-primary p-2 rounded-lg">
          <Gavel size={20} className="text-white" />
        </div>
        <h2 className="text-xl font-law font-bold text-law-primary">Nova Tarefa Jurídica</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-law-text font-medium mb-2">Título da Tarefa</label>
          <input
            type="text"
            className="law-input"
            placeholder="Ex: Elaborar petição, Enviar notificação, etc."
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="block text-law-text font-medium mb-2">Tipo de Atividade</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'email' })}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                formData.type === 'email'
                  ? 'bg-law-primary border-law-primary text-white'
                  : 'border-law-border text-law-text hover:bg-gray-50'
              }`}
            >
              <Mail size={18} />
              <span>Comunicação</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'report' })}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                formData.type === 'report'
                  ? 'bg-law-primary border-law-primary text-white'
                  : 'border-law-border text-law-text hover:bg-gray-50'
              }`}
            >
              <FileText size={18} />
              <span>Documento</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-law-text font-medium mb-2">Prioridade</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, priority: 'high' })}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                formData.priority === 'high'
                  ? 'bg-law-warning border-law-warning text-white'
                  : 'border-law-border text-law-text hover:bg-gray-50'
              }`}
            >
              <Clock size={18} />
              <span>Urgente</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, priority: 'default' })}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                formData.priority === 'default'
                  ? 'bg-law-secondary border-law-secondary text-white'
                  : 'border-law-border text-law-text hover:bg-gray-50'
              }`}
            >
              <Clock size={18} />
              <span>Normal</span>
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="law-btn-primary w-full">
          {loading ? 'Criando...' : 'Criar Tarefa'}
        </button>
      </form>
    </div>
  );
};
