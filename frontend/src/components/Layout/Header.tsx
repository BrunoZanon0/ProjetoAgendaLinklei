import React from 'react';
import { Scale, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-law-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-law-accent p-2 rounded-lg">
              <Scale size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-law font-bold">Agenda Jurídica</h1>
              <p className="text-sm opacity-90">Sistema de Tarefas Advocatícias</p>
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
              <LogOut size={18} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
