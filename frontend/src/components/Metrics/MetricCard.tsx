import React from 'react';

interface MetricCardProps {
  title: string;
  value: number | string;
  color: string;
  icon: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, color, icon }) => {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className={`${colors[color]} rounded-lg p-4 text-center transition-all hover:scale-105`}>
      <div className="text-2xl">{icon}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm mt-1">{title}</div>
    </div>
  );
};
