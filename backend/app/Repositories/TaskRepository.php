<?php

namespace App\Repositories;

use App\Models\Task;
use App\Contracts\Repositories\TaskRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class TaskRepository implements TaskRepositoryInterface
{
    public function findAll(): Collection
    {
        return Task::with('logs')->orderBy('created_at', 'desc')->get();
    }

    public function findById(int $id): ?Task
    {
        return Task::with('logs')->find($id);
    }

    public function create(array $data): Task
    {
        return Task::create($data);
    }

    public function update(Task $task, array $data): Task
    {
        $task->update($data);
        return $task;
    }

    public function getMetrics(): array
    {
        return [
            'total' => Task::count(),
            'completed' => Task::where('status', 'completed')->count(),
            'failed' => Task::where('status', 'failed')->count(),
            'processing' => Task::where('status', 'processing')->count(),
            'pending' => Task::where('status', 'pending')->count(),
        ];
    }
}
