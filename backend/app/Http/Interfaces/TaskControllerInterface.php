<?php

namespace App\Http\Interfaces;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

interface TaskControllerInterface
{
    /**
     * Lista todas as tarefas
     * 
     * @return JsonResponse
     */
    public function index(): JsonResponse;

    /**
     * Cria uma nova tarefa
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse;

    /**
     * Mostra os detalhes de uma tarefa específica
     * 
     * @param Task $task
     * @return JsonResponse
     */
    public function show(Task $task): JsonResponse;

    /**
     * Reprocessa uma tarefa que falhou
     * 
     * @param Task $task
     * @return JsonResponse
     */
    public function retry(Task $task): JsonResponse;

    /**
     * Retorna as métricas do sistema
     * 
     * @return JsonResponse
     */
    public function metrics(): JsonResponse;
}
