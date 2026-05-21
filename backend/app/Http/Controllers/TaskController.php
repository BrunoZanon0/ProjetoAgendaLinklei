<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Jobs\ProcessTask;
use App\Events\TaskStatusChanged;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    public function index(): JsonResponse
    {
        $tasks = Task::with('logs')->orderBy('created_at', 'desc')->get();
        return response()->json($tasks);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:email,report',
            'priority' => 'required|in:high,default'
        ]);

        $task = Task::create([
            ...$validated,
            'status' => 'pending'
        ]);

        $queue = $task->priority === 'high' ? 'high' : 'default';
        ProcessTask::dispatch($task)->onQueue($queue);

        event(new TaskStatusChanged($task));

        return response()->json($task, 201);
    }

    public function show(Task $task): JsonResponse
    {
        return response()->json($task->load('logs'));
    }

    public function retry(Task $task): JsonResponse
    {
        if ($task->status !== 'failed') {
            return response()->json(['error' => 'Only failed tasks can be retried'], 422);
        }

        $task->update([
            'status' => 'pending',
            'attempts' => 0,
            'error_message' => null,
            'started_at' => null,
            'completed_at' => null
        ]);

        $task->addLog('retry_manual', 'Task manually retried by user');

        $queue = $task->priority === 'high' ? 'high' : 'default';
        ProcessTask::dispatch($task)->onQueue($queue);

        event(new TaskStatusChanged($task));

        return response()->json($task);
    }

    public function metrics(): JsonResponse
    {
        $total = Task::count();
        $completed = Task::where('status', 'completed')->count();
        $failed = Task::where('status', 'failed')->count();
        $processing = Task::where('status', 'processing')->count();
        $pending = Task::where('status', 'pending')->count();
        
        // Tempo médio de processamento - versão compatível com MySQL
        $avgProcessingTime = 0;
        $completedTasks = Task::where('status', 'completed')
            ->whereNotNull('started_at')
            ->whereNotNull('completed_at')
            ->get();
        
        if ($completedTasks->count() > 0) {
            $totalSeconds = 0;
            foreach ($completedTasks as $task) {
                $totalSeconds += $task->completed_at->diffInSeconds($task->started_at);
            }
            $avgProcessingTime = $totalSeconds / $completedTasks->count();
        }

        // Tarefas por tipo
        $tasksByType = Task::selectRaw('type, COUNT(*) as total')
            ->groupBy('type')
            ->pluck('total', 'type');

        // Tarefas por prioridade
        $tasksByPriority = Task::selectRaw('priority, COUNT(*) as total')
            ->groupBy('priority')
            ->pluck('total', 'priority');

        return response()->json([
            'total_tasks' => $total,
            'completed_tasks' => $completed,
            'failed_tasks' => $failed,
            'processing_tasks' => $processing,
            'pending_tasks' => $pending,
            'success_rate' => $total > 0 ? round(($completed / $total) * 100, 2) : 0,
            'failure_rate' => $total > 0 ? round(($failed / $total) * 100, 2) : 0,
            'average_processing_time_seconds' => round($avgProcessingTime, 2),
            'tasks_by_type' => $tasksByType,
            'tasks_by_priority' => $tasksByPriority
        ]);
    }
}
