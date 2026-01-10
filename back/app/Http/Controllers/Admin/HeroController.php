<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use Illuminate\Http\Request;

class HeroController extends Controller
{
    /**
     * Buscar hero section
     */
    public function show()
    {
        $hero = HeroSection::first();
        
        if (!$hero) {
            return response()->json([
                'success' => false,
                'message' => 'Hero section não encontrada'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $hero
        ]);
    }
    
    /**
     * Atualizar hero section
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'subtitle' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'background_image_url' => 'sometimes|string|max:500',
            'cta_button_text' => 'sometimes|string|max:100',
            'cta_button_href' => 'sometimes|string|max:255',
        ]);
        
        $hero = HeroSection::first();
        
        if (!$hero) {
            return response()->json([
                'success' => false,
                'message' => 'Hero section não encontrada'
            ], 404);
        }
        
        $hero->update($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'Hero section atualizada com sucesso',
            'data' => $hero
        ]);
    }
}
