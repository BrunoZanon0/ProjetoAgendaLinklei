import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Scale, User, Lock } from 'lucide-react';

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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-law-primary rounded-full mb-4">
            <Scale size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-law font-bold text-law-primary">Agenda Jurídica</h1>
          <p className="text-law-text-light mt-2">Faça login para acessar seu escritório</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-law-error px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-law-text font-medium mb-2">E-mail profissional</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-law-text-light" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="law-input pl-10"
                placeholder="advogado@escritorio.com.br"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-law-text font-medium mb-2">Senha</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-law-text-light" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="law-input pl-10"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="law-btn-primary w-full">
            {loading ? 'Acessando...' : 'Acessar Agenda'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-law-text-light">
            Não tem cadastro?{' '}
            <button onClick={onSwitchToRegister} className="text-law-primary font-semibold hover:underline">
              Criar conta profissional
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
