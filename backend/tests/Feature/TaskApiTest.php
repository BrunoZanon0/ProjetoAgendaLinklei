<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $token;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Criar usuário e token para os testes
        $this->user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123')
        ]);
        
        $this->token = $this->user->createToken('test-token')->plainTextToken;
    }

    protected function withAuth()
    {
        return $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token
        ]);
    }

    public function test_can_list_tasks()
    {
        Task::factory()->count(3)->create(['user_id' => $this->user->id]);

        $response = $this->withAuth()->getJson('/api/tasks');

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

        $response = $this->withAuth()->postJson('/api/tasks', $taskData);

        $response->assertStatus(201)
                 ->assertJsonFragment(['name' => 'New Task']);
    }

    public function test_cannot_create_task_without_name()
    {
        $response = $this->withAuth()->postJson('/api/tasks', [
            'type' => 'email',
            'priority' => 'high'
        ]);

        $response->assertStatus(422);
    }

    public function test_can_retry_failed_task()
    {
        $task = Task::create([
            'user_id' => $this->user->id,
            'name' => 'Failed Task',
            'type' => 'email',
            'priority' => 'high',
            'status' => 'failed'
        ]);

        $response = $this->withAuth()->postJson("/api/tasks/{$task->id}/retry");

        $response->assertStatus(200);
        $this->assertEquals('pending', $task->fresh()->status);
    }

    public function test_cannot_retry_non_failed_task()
    {
        $task = Task::create([
            'user_id' => $this->user->id,
            'name' => 'Completed Task',
            'type' => 'email',
            'priority' => 'high',
            'status' => 'completed'
        ]);

        $response = $this->withAuth()->postJson("/api/tasks/{$task->id}/retry");

        $response->assertStatus(422);
    }

    public function test_can_get_metrics()
    {
        Task::create([
            'user_id' => $this->user->id,
            'name' => 'Task 1',
            'type' => 'email',
            'priority' => 'high',
            'status' => 'completed'
        ]);

        Task::create([
            'user_id' => $this->user->id,
            'name' => 'Task 2',
            'type' => 'report',
            'priority' => 'default',
            'status' => 'failed'
        ]);

        $response = $this->withAuth()->getJson('/api/metrics');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'total_tasks',
                     'completed_tasks',
                     'failed_tasks',
                     'success_rate'
                 ]);
    }

    public function test_unauthorized_access_returns_401()
    {
        $response = $this->getJson('/api/tasks');
        $response->assertStatus(401);
    }
}
