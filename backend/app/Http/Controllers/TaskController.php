<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Jobs\ProcessTask;
use App\Events\TaskStatusChanged;
use App\Http\Interfaces\TaskControllerInterface;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller implements TaskControllerInterface
{
    public function index(): JsonResponse
    {
        $tasks = Task::with('logs')
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get();
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
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'type' => $validated['type'],
            'priority' => $validated['priority'],
            'status' => 'pending'
        ]);

        $queue = $task->priority === 'high' ? 'high' : 'default';
        ProcessTask::dispatch($task)->onQueue($queue);

        event(new TaskStatusChanged($task));

        return response()->json($task, 201);
    }

    public function show(Task $task): JsonResponse
    {
        if ($task->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        return response()->json($task->load('logs'));
    }

    public function retry(Task $task): JsonResponse
    {
        if ($task->user_id !== auth()->id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

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
        $query = Task::where('user_id', auth()->id());
        
        $total = (clone $query)->count();
        $completed = (clone $query)->where('status', 'completed')->count();
        $failed = (clone $query)->where('status', 'failed')->count();
        $processing = (clone $query)->where('status', 'processing')->count();
        $pending = (clone $query)->where('status', 'pending')->count();
        
        $avgProcessingTime = 0;
        $completedTasks = (clone $query)->where('status', 'completed')
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

        $tasksByType = (clone $query)->selectRaw('type, COUNT(*) as total')
            ->groupBy('type')
            ->pluck('total', 'type');

        $tasksByPriority = (clone $query)->selectRaw('priority, COUNT(*) as total')
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
