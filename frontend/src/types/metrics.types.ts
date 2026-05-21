export interface Metrics {
  total_tasks: number;
  completed_tasks: number;
  failed_tasks: number;
  processing_tasks: number;
  pending_tasks: number;
  success_rate: number;
  failure_rate: number;
  average_processing_time_seconds: number;
  tasks_by_type: Record<string, number>;
  tasks_by_priority: Record<string, number>;
}
