<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;

class ContactRateLimiter
{
    /**
     * Limite de envios por hora
     */
    protected int $maxAttempts = 3;

    /**
     * Tempo de bloqueio em minutos
     */
    protected int $decayMinutes = 60;

    /**
     * Verifica se o IP pode enviar o formulário
     */
    public function canSubmit(Request $request): bool
    {
        $key = $this->getKey($request);
        $attempts = Cache::get($key, 0);

        return $attempts < $this->maxAttempts;
    }

    /**
     * Registra uma tentativa de envio
     */
    public function hit(Request $request): void
    {
        $key = $this->getKey($request);
        $attempts = Cache::get($key, 0);
        
        Cache::put($key, $attempts + 1, now()->addMinutes($this->decayMinutes));
    }

    /**
     * Retorna quantas tentativas restam
     */
    public function remainingAttempts(Request $request): int
    {
        $key = $this->getKey($request);
        $attempts = Cache::get($key, 0);

        return max(0, $this->maxAttempts - $attempts);
    }

    /**
     * Retorna quando o bloqueio expira (em segundos)
     */
    public function availableIn(Request $request): int
    {
        $key = $this->getKey($request);
        
        if (!Cache::has($key)) {
            return 0;
        }

        // Calcula o tempo restante até expirar o cache
        $expiresAt = now()->addMinutes($this->decayMinutes);
        return max(0, $expiresAt->diffInSeconds(now()));
    }

    /**
     * Gera a chave única para o IP
     */
    protected function getKey(Request $request): string
    {
        return 'contact_rate_limit:' . $request->ip();
    }

    /**
     * Limpa o rate limit para um IP específico (útil para testes)
     */
    public function clear(Request $request): void
    {
        $key = $this->getKey($request);
        Cache::forget($key);
    }
}
