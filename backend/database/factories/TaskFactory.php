<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(3),
            'type' => $this->faker->randomElement(['email', 'report']),
            'priority' => $this->faker->randomElement(['high', 'default']),
            'status' => $this->faker->randomElement(['pending', 'processing', 'completed', 'failed']),
            'attempts' => 0,
        ];
    }
}
