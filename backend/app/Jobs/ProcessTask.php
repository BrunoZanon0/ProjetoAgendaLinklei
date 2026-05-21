<?php

namespace App\Jobs;

use App\Models\Task;
use App\Events\TaskStatusChanged;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessTask implements ShouldQueue
{
    use InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;
    public $backoff = [5, 15, 30];

    public function __construct(public Task $task)
    {}

    public function handle(): void
    {
        $this->task->update([
            'status' => 'processing',
            'started_at' => now(),
            'attempts' => $this->attempts()
        ]);
        
        $this->task->addLog('started', "Task started processing");
        event(new TaskStatusChanged($this->task));

        try {
            $result = $this->process();
            
            $this->task->update([
                'status' => 'completed',
                'output' => $result,
                'completed_at' => now()
            ]);
            
            $this->task->addLog('completed', "Task completed successfully");
            event(new TaskStatusChanged($this->task));
            
        } catch (\Exception $e) {
            $this->task->addLog('failed', $e->getMessage());
            
            if ($this->attempts() >= $this->tries) {
                $this->task->update([
                    'status' => 'failed',
                    'error_message' => $e->getMessage(),
                    'completed_at' => now()
                ]);
                event(new TaskStatusChanged($this->task));
            } else {
                $this->task->update(['status' => 'retrying']);
                $this->task->addLog('retrying', "Attempt {$this->attempts()} of {$this->tries}");
                event(new TaskStatusChanged($this->task));
                throw $e;
            }
        }
    }

    private function process(): string
    {
        $delay = $this->task->priority === 'high' ? 3 : 8;
        sleep($delay);

        // Simular falha (20% de chance)
        if (rand(1, 100) <= 20 && $this->attempts() < $this->tries) {
            throw new \Exception("Simulated processing error - attempt {$this->attempts()}");
        }

        if ($this->task->type === 'email') {
            return json_encode([
                'to' => 'user@example.com',
                'subject' => "Task #{$this->task->id}",
                'body' => "This is a simulated email from task {$this->task->name}",
                'sent_at' => now()->toDateTimeString()
            ]);
        }
        
        return json_encode([
            'task_id' => $this->task->id,
            'task_name' => $this->task->name,
            'generated_at' => now()->toDateTimeString(),
            'data' => ['processed' => true]
        ]);
    }
}
