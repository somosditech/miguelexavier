<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use Illuminate\Http\Request;

class ThemeController extends Controller
{
    /**
     * Buscar tema atual
     */
    public function show()
    {
        $theme = Theme::first();
        
        if (!$theme) {
            return response()->json([
                'success' => false,
                'message' => 'Tema não encontrado'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $theme
        ]);
    }
    
    /**
     * Atualizar tema
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'primary_color' => 'sometimes|string|max:7',
            'secondary_color' => 'sometimes|string|max:7',
            'accent_color' => 'sometimes|string|max:7',
            'background_color' => 'sometimes|string|max:7',
            'background_dark' => 'sometimes|string|max:7',
            'background_light' => 'sometimes|string|max:7',
            'text_primary' => 'sometimes|string|max:7',
            'text_secondary' => 'sometimes|string|max:7',
            'text_light' => 'sometimes|string|max:7',
            'logo_url' => 'nullable|string|max:500',
        ]);
        
        $theme = Theme::first();
        
        if (!$theme) {
            return response()->json([
                'success' => false,
                'message' => 'Tema não encontrado'
            ], 404);
        }
        
        $theme->update($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'Tema atualizado com sucesso',
            'data' => $theme
        ]);
    }
}
