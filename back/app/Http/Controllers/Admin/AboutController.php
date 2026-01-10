<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutSection;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    /**
     * Buscar about section
     */
    public function show()
    {
        $about = AboutSection::first();
        
        if (!$about) {
            return response()->json([
                'success' => false,
                'message' => 'About section não encontrada'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $about
        ]);
    }
    
    /**
     * Atualizar about section
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'subtitle' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'image_url' => 'sometimes|string|max:500',
        ]);
        
        $about = AboutSection::first();
        
        if (!$about) {
            return response()->json([
                'success' => false,
                'message' => 'About section não encontrada'
            ], 404);
        }
        
        $about->update($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'About section atualizada com sucesso',
            'data' => $about
        ]);
    }
}
