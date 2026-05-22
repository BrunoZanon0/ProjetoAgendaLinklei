import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== passwordConfirmation) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
    } catch (err: any) {
      const errors = err.response?.data?.errors;
      if (errors) {
        if (errors.name) setError(errors.name[0]);
        else if (errors.email) setError(errors.email[0]);
        else if (errors.password) setError(errors.password[0]);
        else setError('Erro ao cadastrar');
      } else {
        setError('Erro ao cadastrar');
      }
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
          <p className="text-sm text-law-text-light mt-1">Crie sua conta para começar</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-law-error px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-law-text font-medium mb-2">Nome completo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-law-text-light">👤</span>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-law-border rounded-lg focus:outline-none focus:ring-2 focus:ring-law-primary focus:border-transparent"
                placeholder="Seu nome"
                required
              />
            </div>
          </div>

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

          <div className="mb-4">
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
                placeholder="Mínimo 6 caracteres"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-law-text font-medium mb-2">Confirmar Senha</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-law-text-light">✓</span>
              </div>
              <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-law-border rounded-lg focus:outline-none focus:ring-2 focus:ring-law-primary focus:border-transparent"
                placeholder="Confirme sua senha"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-law-primary hover:bg-opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-law-text-light">
            Já tem uma conta?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-law-primary font-semibold hover:underline"
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
