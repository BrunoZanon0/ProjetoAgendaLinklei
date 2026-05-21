<?php

namespace App\Events;

use App\Models\Task;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TaskStatusChanged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Task $task)
    {}

    public function broadcastOn(): array
    {
        return [
            new Channel('tasks')
        ];
    }

    public function broadcastAs(): string
    {
        return 'task.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->task->id,
            'name' => $this->task->name,
            'type' => $this->task->type,
            'priority' => $this->task->priority,
            'status' => $this->task->status,
            'output' => $this->task->output,
            'error_message' => $this->task->error_message,
            'attempts' => $this->task->attempts,
            'created_at' => $this->task->created_at?->toISOString(),
            'updated_at' => $this->task->updated_at?->toISOString(),
        ];
    }
}
