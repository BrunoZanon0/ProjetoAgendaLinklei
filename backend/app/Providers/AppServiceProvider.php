<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Interfaces\TaskControllerInterface;
use App\Http\Controllers\TaskController;
use App\Http\Interfaces\MetricsControllerInterface;
use App\Http\Controllers\MetricsController;
use App\Http\Interfaces\AuthControllerInterface;
use App\Http\Controllers\AuthController;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Bind interfaces to controllers
        $this->app->bind(TaskControllerInterface::class, TaskController::class);
        $this->app->bind(MetricsControllerInterface::class, MetricsController::class);
        $this->app->bind(AuthControllerInterface::class, AuthController::class);
    }

    public function boot(): void
    {
        //
    }
}
