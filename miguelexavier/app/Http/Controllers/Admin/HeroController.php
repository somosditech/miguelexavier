<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Hero\UpdateHeroRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Http\Requests\Hero\UploadHeroRequest;
use App\Models\HeroSection;
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
    public function update(UpdateHeroRequest $request)
    {
        $hero = HeroSection::first();
        
        if (!$hero) {
            return response()->json([
                'success' => false,
                'message' => 'Hero section não encontrada'
            ], 404);
        }
        
        $hero->update($request->validated());
        
        // Registrar atividade
        logActivity('hero_updated', 'Hero atualizado');
        
        return response()->json([
            'success' => true,
            'message' => 'Hero section atualizada com sucesso',
            'data' => $hero
        ]);
    }

    /**
     * Upload de imagem de fundo do hero
     */
    public function uploadBackground(UploadHeroRequest $request)
    {
        try {
            $hero = HeroSection::first();
            
            if (!$hero) {
                return response()->json([
                    'success' => false,
                    'message' => 'Hero section não encontrada'
                ], 404);
            }

            // Remove imagem antiga se existir
            if ($hero->background_image_url && Storage::disk('public')->exists($hero->background_image_url)) {
                Storage::disk('public')->delete($hero->background_image_url);
            }

            // Salva nova imagem
            $path = $request->file('background_image')->store('hero-backgrounds', 'public');
            
            // Atualiza no banco
            $hero->update(['background_image_url' => $path]);

            return response()->json([
                'success' => true,
                'message' => 'Imagem de fundo enviada com sucesso',
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
