import React from 'react';
import { useAuth } from '../context/AuthContext';
import { TaskSystem } from './TaskSystem';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-gray-800">📋 Task System</span>
            <span className="text-sm text-gray-600">Bem-vindo, {user?.name}!</span>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Sair
          </button>
        </div>
      </div>
      <TaskSystem />
    </div>
  );
};
