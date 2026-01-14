<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

    /**
     * Upload de imagem do about
     */
    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB
        ]);

        try {
            $about = AboutSection::first();
            
            if (!$about) {
                return response()->json([
                    'success' => false,
                    'message' => 'About section não encontrada'
                ], 404);
            }

            // Remove imagem antiga se existir
            if ($about->image_url && Storage::disk('public')->exists($about->image_url)) {
                Storage::disk('public')->delete($about->image_url);
            }

            // Salva nova imagem
            $path = $request->file('image')->store('about-images', 'public');
            
            // Atualiza no banco
            $about->update(['image_url' => $path]);

            return response()->json([
                'success' => true,
                'message' => 'Imagem enviada com sucesso',
                'path' => $path,
                'url' => Storage::url($path)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao fazer upload: ' . $e->getMessage()
            ], 500);
        }
    }
}
