<?php

namespace App\Http\Interfaces;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

interface AuthControllerInterface
{
    /**
     * Registrar um novo usuário
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse;

    /**
     * Login do usuário
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse;

    /**
     * Logout do usuário
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse;

    /**
     * Obter usuário autenticado
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function me(Request $request): JsonResponse;
}
