<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdminActivity;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Retorna as atividades recentes do admin
     */
    public function activities()
    {
        $activities = AdminActivity::with('user')
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($activity) {
                return [
                    'type' => $activity->type,
                    'description' => $activity->description,
                    'date' => $activity->created_at->toISOString(),
                    'user' => $activity->user?->name ?? 'Sistema'
                ];
            });

        return response()->json($activities);
    }

    /**
     * Retorna estatísticas do dashboard
     */
    public function stats()
    {
        // Por enquanto retorna dados básicos
        // Pode ser expandido no futuro
        return response()->json([
            'activities_count' => AdminActivity::count(),
            'recent_activities' => AdminActivity::latest()->limit(5)->count()
        ]);
    }
}
