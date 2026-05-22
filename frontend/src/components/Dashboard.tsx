import React from 'react';
import { Header } from './Layout/Header';
import { TaskSystem } from './TaskSystem';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-law-bg">
      <Header />
      <TaskSystem />
    </div>
  );
};
