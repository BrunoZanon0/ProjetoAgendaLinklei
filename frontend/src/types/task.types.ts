export type TaskType = 'email' | 'report';
export type TaskPriority = 'high' | 'default';
export type TaskStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'retrying';

export interface Task {
  id: number;
  name: string;
  type: TaskType;
  priority: TaskPriority;
  status: TaskStatus;
  attempts: number;
  output: string | null;
  error_message: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskDTO {
  name: string;
  type: TaskType;
  priority: TaskPriority;
}
