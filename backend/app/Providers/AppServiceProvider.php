<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Contracts\Repositories\TaskRepositoryInterface;
use App\Contracts\Services\MetricsServiceInterface;
use App\Repositories\TaskRepository;
use App\Services\MetricsService;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Bind interfaces to implementations
        $this->app->bind(TaskRepositoryInterface::class, TaskRepository::class);
        $this->app->bind(MetricsServiceInterface::class, MetricsService::class);
    }

    public function boot(): void
    {
        //
    }
}
