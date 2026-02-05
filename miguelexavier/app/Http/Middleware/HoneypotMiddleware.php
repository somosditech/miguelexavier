<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class HoneypotMiddleware
{
    /**
     * Handle an incoming request.
     * 
     * Verifica se o campo honeypot foi preenchido.
     * Se foi, é um bot e bloqueia a requisição.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Nome do campo honeypot (deve ser invisível no frontend)
        $honeypotField = 'website';

        // Se o campo honeypot foi preenchido, é um bot
        if ($request->filled($honeypotField)) {
            Log::warning('Honeypot detectou bot', [
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'honeypot_value' => $request->input($honeypotField)
            ]);

            // Retorna sucesso falso para não alertar o bot
            return response()->json([
                'success' => true,
                'message' => 'Mensagem enviada com sucesso!'
            ], 200);
        }

        return $next($request);
    }
}
