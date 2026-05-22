import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface LoginProps {
  onSwitchToRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.response?.data?.errors?.email?.[0] || 'Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-law-pattern bg-law-primary">
      <div className="law-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-law-primary rounded-full mb-4">
            <span className="text-4xl">⚖️</span>
          </div>
          <h1 className="text-3xl font-law font-bold text-law-primary">TaskFlow</h1>
          <p className="text-law-text-light mt-2">Agendamento e Processamento de Tarefas</p>
          <p className="text-sm text-law-text-light mt-1">Faça login para acessar o sistema</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-law-error px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-law-text font-medium mb-2">E-mail</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-law-text-light">📧</span>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-law-border rounded-lg focus:outline-none focus:ring-2 focus:ring-law-primary focus:border-transparent"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-law-text font-medium mb-2">Senha</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-law-text-light">🔒</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-law-border rounded-lg focus:outline-none focus:ring-2 focus:ring-law-primary focus:border-transparent"
                placeholder="Digite sua senha"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-law-primary hover:bg-opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Acessando...' : 'Acessar Sistema'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-law-text-light">
            Não tem cadastro?{' '}
            <button
              onClick={onSwitchToRegister}
              className="text-law-primary font-semibold hover:underline"
            >
              Criar conta
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
