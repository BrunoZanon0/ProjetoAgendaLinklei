<?php

namespace App\Http\Controllers;

use App\Contracts\Services\MetricsServiceInterface;
use App\Http\Interfaces\MetricsControllerInterface;
use Illuminate\Http\JsonResponse;

class MetricsController extends Controller implements MetricsControllerInterface
{
    public function __construct(
        protected MetricsServiceInterface $metricsService
    ) {}

    /**
     * {@inheritdoc}
     */
    public function getMetrics(): JsonResponse
    {
        return response()->json([
            'total_tasks' => $this->metricsService->getTotalTasks(),
            'completed_tasks' => $this->metricsService->getCompletedTasks(),
            'failed_tasks' => $this->metricsService->getFailedTasks(),
            'success_rate' => $this->metricsService->getSuccessRate(),
            'average_processing_time_seconds' => $this->metricsService->getAverageProcessingTime(),
            'tasks_by_type' => $this->metricsService->getTasksByType(),
            'tasks_by_priority' => $this->metricsService->getTasksByPriority(),
        ]);
    }
}
