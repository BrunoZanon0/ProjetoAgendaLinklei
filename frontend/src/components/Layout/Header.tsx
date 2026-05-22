import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-law-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-law-accent p-2 rounded-lg">
              <span className="text-2xl">⚖️</span>
            </div>
            <div>
              <h1 className="text-2xl font-law font-bold">TaskFlow</h1>
              <p className="text-sm opacity-90">Agendamento e Processamento de Tarefas</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs opacity-75">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-law-accent hover:bg-opacity-80 px-4 py-2 rounded-lg transition"
            >
              <span>🚪</span>
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
