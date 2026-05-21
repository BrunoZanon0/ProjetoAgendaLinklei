import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Task } from '../types/task.types';

export const useWebSocket = (onTaskUpdate: (task: Task) => void) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Tentar conectar ao Laravel Reverb
    const socket = io('http://localhost:8080', {
      transports: ['websocket', 'polling'],
      path: '/socket.io',
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      console.log('✅ WebSocket connected to Reverb');
      
      // Inscrever no canal de tasks
      socket.emit('subscribe', 'tasks');
    });

    socket.on('task.updated', (data: Task) => {
      console.log('📡 Task updated via WebSocket:', data);
      onTaskUpdate(data);
    });

    socket.on('disconnect', () => {
      console.log('❌ WebSocket disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    socketRef.current = socket;

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [onTaskUpdate]);

  return { socket: socketRef.current };
};
