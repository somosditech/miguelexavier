<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

if (!function_exists('logActivity')) {
    /**
     * Registra uma atividade do admin
     *
     * @param string $type Tipo da atividade (hero_updated, team_added, etc)
     * @param string $description Descrição da atividade
     * @return void
     */
    function logActivity(string $type, string $description): void
    {
        try {
            \App\Models\AdminActivity::create([
                'type' => $type,
                'description' => $description,
                'user_id' => Auth::id()
            ]);
        } catch (\Exception $e) {
            // Silenciosamente falhar para não quebrar o fluxo principal
            Log::error('Failed to log activity: ' . $e->getMessage());
        }
    }
}
