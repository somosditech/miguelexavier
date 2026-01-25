<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Theme\UpdateThemeRequest;
use App\Http\Controllers\Controller;
use App\Models\Theme;

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
    public function update(UpdateThemeRequest $request)
    {        
        $theme = Theme::first();
        
        if (!$theme) {
            return response()->json([
                'success' => false,
                'message' => 'Tema não encontrado'
            ], 404);
        }
        
        $theme->update($request->validated());
        
        return response()->json([
            'success' => true,
            'message' => 'Tema atualizado com sucesso',
            'data' => $theme
        ]);
    }
}