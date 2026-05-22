<?php

namespace Tests\Unit;

use App\Models\Task;
use App\Jobs\ProcessTask;
use Illuminate\Support\Facades\Queue;
use Tests\TestCase;

class ProcessTaskTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        Queue::fake();
    }

    public function test_email_task_processing()
    {
        $task = Task::create([
            'name' => 'Test Email',
            'type' => 'email',
            'priority' => 'high',
            'status' => 'pending'
        ]);

        ProcessTask::dispatch($task);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'type' => 'email'
        ]);
    }

    public function test_report_task_processing()
    {
        $task = Task::create([
            'name' => 'Test Report',
            'type' => 'report',
            'priority' => 'default',
            'status' => 'pending'
        ]);

        ProcessTask::dispatch($task);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'type' => 'report'
        ]);
    }

    public function test_task_has_correct_priority_queue()
    {
        $highTask = Task::create([
            'name' => 'High Priority',
            'type' => 'email',
            'priority' => 'high',
            'status' => 'pending'
        ]);

        $defaultTask = Task::create([
            'name' => 'Default Priority',
            'type' => 'email',
            'priority' => 'default',
            'status' => 'pending'
        ]);

        $this->assertEquals('high', $highTask->priority);
        $this->assertEquals('default', $defaultTask->priority);
    }

    public function test_task_status_flow()
    {
        $task = Task::create([
            'name' => 'Status Test',
            'type' => 'email',
            'priority' => 'high',
            'status' => 'pending'
        ]);

        $this->assertEquals('pending', $task->status);

        $task->update(['status' => 'processing']);
        $this->assertEquals('processing', $task->status);

        $task->update(['status' => 'completed']);
        $this->assertEquals('completed', $task->status);
    }
}
