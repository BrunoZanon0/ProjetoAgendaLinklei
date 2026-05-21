<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_tasks()
    {
        Task::factory()->count(3)->create();

        $response = $this->getJson('/api/tasks');

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    public function test_can_create_task()
    {
        $taskData = [
            'name' => 'New Task',
            'type' => 'email',
            'priority' => 'high'
        ];

        $response = $this->postJson('/api/tasks', $taskData);

        $response->assertStatus(201)
                 ->assertJsonFragment(['name' => 'New Task']);
    }

    public function test_cannot_create_task_without_name()
    {
        $response = $this->postJson('/api/tasks', [
            'type' => 'email',
            'priority' => 'high'
        ]);

        $response->assertStatus(422);
    }

    public function test_can_retry_failed_task()
    {
        $task = Task::create([
            'name' => 'Failed Task',
            'type' => 'email',
            'priority' => 'high',
            'status' => 'failed'
        ]);

        $response = $this->postJson("/api/tasks/{$task->id}/retry");

        $response->assertStatus(200);
        $this->assertEquals('pending', $task->fresh()->status);
    }

    public function test_cannot_retry_non_failed_task()
    {
        $task = Task::create([
            'name' => 'Completed Task',
            'type' => 'email',
            'priority' => 'high',
            'status' => 'completed'
        ]);

        $response = $this->postJson("/api/tasks/{$task->id}/retry");

        $response->assertStatus(422);
    }

    public function test_can_get_metrics()
    {
        Task::create([
            'name' => 'Task 1',
            'type' => 'email',
            'priority' => 'high',
            'status' => 'completed'
        ]);

        Task::create([
            'name' => 'Task 2',
            'type' => 'report',
            'priority' => 'default',
            'status' => 'failed'
        ]);

        $response = $this->getJson('/api/metrics');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'total_tasks',
                     'completed_tasks',
                     'failed_tasks',
                     'success_rate'
                 ]);
    }
}
