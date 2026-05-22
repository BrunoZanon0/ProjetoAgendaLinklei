<?php

namespace App\Contracts\Services;

interface MetricsServiceInterface
{
    public function getTotalTasks(): int;
    public function getCompletedTasks(): int;
    public function getFailedTasks(): int;
    public function getSuccessRate(): float;
    public function getAverageProcessingTime(): float;
    public function getTasksByType(): array;
    public function getTasksByPriority(): array;
}
