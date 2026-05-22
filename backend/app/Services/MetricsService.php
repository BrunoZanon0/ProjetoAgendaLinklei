<?php

namespace App\Services;

use App\Models\Task;
use App\Contracts\Services\MetricsServiceInterface;
use App\Contracts\Repositories\TaskRepositoryInterface;

class MetricsService implements MetricsServiceInterface
{
    protected $taskRepository;

    public function __construct(TaskRepositoryInterface $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function getTotalTasks(): int
    {
        return $this->taskRepository->getMetrics()['total'];
    }

    public function getCompletedTasks(): int
    {
        return $this->taskRepository->getMetrics()['completed'];
    }

    public function getFailedTasks(): int
    {
        return $this->taskRepository->getMetrics()['failed'];
    }

    public function getSuccessRate(): float
    {
        $total = $this->getTotalTasks();
        if ($total === 0) return 0;
        
        $completed = $this->getCompletedTasks();
        return round(($completed / $total) * 100, 2);
    }

    public function getAverageProcessingTime(): float
    {
        $completedTasks = Task::where('status', 'completed')
            ->whereNotNull('started_at')
            ->whereNotNull('completed_at')
            ->get();
        
        if ($completedTasks->count() === 0) return 0;
        
        $totalSeconds = 0;
        foreach ($completedTasks as $task) {
            $totalSeconds += $task->completed_at->diffInSeconds($task->started_at);
        }
        
        return round($totalSeconds / $completedTasks->count(), 2);
    }

    public function getTasksByType(): array
    {
        return Task::selectRaw('type, COUNT(*) as total')
            ->groupBy('type')
            ->pluck('total', 'type')
            ->toArray();
    }

    public function getTasksByPriority(): array
    {
        return Task::selectRaw('priority, COUNT(*) as total')
            ->groupBy('priority')
            ->pluck('total', 'priority')
            ->toArray();
    }
}
