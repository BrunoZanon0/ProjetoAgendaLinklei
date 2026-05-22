<?php

namespace App\Http\Interfaces;

use Illuminate\Http\JsonResponse;

interface MetricsControllerInterface
{
    /**
     * Retorna as métricas do sistema
     * 
     * @return JsonResponse
     */
    public function getMetrics(): JsonResponse;
}
