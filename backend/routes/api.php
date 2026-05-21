<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::get('/tasks', [TaskController::class, 'index']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::get('/tasks/{task}', [TaskController::class, 'show']);
Route::post('/tasks/{task}/retry', [TaskController::class, 'retry']);
Route::get('/metrics', [TaskController::class, 'metrics']);
