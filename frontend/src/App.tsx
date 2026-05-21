import React, { useEffect } from 'react';
import { useTasks } from './hooks/useTasks';
import { useMetrics } from './hooks/useMetrics';
import { TaskForm } from './components/TaskForm/TaskForm';
import { TaskList } from './components/TaskList/TaskList';
import { Metrics } from './components/Metrics/Metrics';
import './index.css';

function App() {
  const { tasks, createTask, retryTask, fetchTasks } = useTasks();
  const { metrics, fetchMetrics } = useMetrics();

  useEffect(() => {
    fetchTasks();
    fetchMetrics();
    
    const interval = setInterval(() => {
      fetchTasks();
      fetchMetrics();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [fetchTasks, fetchMetrics]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg rounded-lg p-6 mb-6">
          <h1 className="text-4xl font-bold text-center">
            📋 Sistema de Tarefas Assíncronas
          </h1>
          <p className="text-center mt-2 opacity-90">
            Processamento em fila com Redis e Workers
          </p>
          <div className="text-center mt-2 text-sm opacity-75 bg-black bg-opacity-25 inline-block px-3 py-1 rounded-full mx-auto block w-fit">
            🔄 Atualização automática a cada 3 segundos
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TaskForm onCreateTask={createTask} />
          <Metrics metrics={metrics} />
        </div>

        <TaskList tasks={tasks} onRetry={retryTask} />
      </div>
    </div>
  );
}

export default App;
