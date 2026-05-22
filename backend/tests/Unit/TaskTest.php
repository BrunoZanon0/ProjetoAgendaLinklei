<?php

namespace Tests\Unit;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_email_task()
    {
        $task = Task::create([
            'name' => 'Test Email',
            'type' => 'email',
            'priority' => 'high',
            'status' => 'pending'
        ]);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'type' => 'email',
            'priority' => 'high'
        ]);
    }

    public function test_can_create_report_task()
    {
        $task = Task::create([
            'name' => 'Test Report',
            'type' => 'report',
            'priority' => 'default',
            'status' => 'pending'
        ]);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'type' => 'report',
            'priority' => 'default'
        ]);
    }

    public function test_task_status_can_be_updated()
    {
        $task = Task::create([
            'name' => 'Status Test',
            'type' => 'email',
            'priority' => 'high',
            'status' => 'pending'
        ]);

        $task->update(['status' => 'processing']);
        $this->assertEquals('processing', $task->fresh()->status);

        $task->update(['status' => 'completed']);
        $this->assertEquals('completed', $task->fresh()->status);
    }

    public function test_task_can_be_retried()
    {
        $task = Task::create([
            'name' => 'Failed Task',
            'type' => 'email',
            'priority' => 'high',
            'status' => 'failed',
            'attempts' => 3
        ]);

        $task->update([
            'status' => 'pending',
            'attempts' => 0,
            'error_message' => null
        ]);

        $this->assertEquals('pending', $task->fresh()->status);
        $this->assertEquals(0, $task->fresh()->attempts);
    }
}
