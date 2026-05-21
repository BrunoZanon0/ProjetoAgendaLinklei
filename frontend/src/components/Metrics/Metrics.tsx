import React from 'react';
import { Metrics as MetricsType } from '../../types/metrics.types';
import { MetricCard } from './MetricCard';

interface MetricsProps {
  metrics: MetricsType | null;
}

export const Metrics: React.FC<MetricsProps> = ({ metrics }) => {
  if (!metrics) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">📊 Métricas</h2>
        <div className="text-center py-8 text-gray-500">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Métricas do Sistema</h2>
      <div className="grid grid-cols-2 gap-4">
        <MetricCard title="Total" value={metrics.total_tasks} color="blue" icon="📋" />
        <MetricCard title="Concluídas" value={metrics.completed_tasks} color="green" icon="✅" />
        <MetricCard title="Falhas" value={metrics.failed_tasks} color="red" icon="❌" />
        <MetricCard title="Sucesso" value={`${metrics.success_rate}%`} color="purple" icon="📈" />
      </div>
    </div>
  );
};
