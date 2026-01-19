<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadController extends Controller
{
    /**
     * Upload de imagem
     * 
     * Aceita upload de imagens e salva em storage/app/public/images
     * Retorna a URL pública da imagem
     */
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // Max 5MB
            'folder' => 'nullable|string|in:team,hero,about,general', // Pasta opcional
        ]);

        try {
            $image = $request->file('image');
            $folder = $request->input('folder', 'general');

            // Gera nome único para a imagem
            $filename = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();

            // Salva a imagem em storage/app/public/images/{folder}
            $path = $image->storeAs("images/{$folder}", $filename, 'public');

            // Retorna a URL pública
            $url = Storage::url($path);

            return response()->json([
                'success' => true,
                'message' => 'Imagem enviada com sucesso',
                'data' => [
                    'filename' => $filename,
                    'path' => $path,
                    'url' => $url,
                    'fullUrl' => url($url), // URL completa com domínio
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao fazer upload da imagem',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Deleta uma imagem
     */
    public function delete(Request $request)
    {
        $request->validate([
            'path' => 'required|string',
        ]);

        try {
            $path = $request->input('path');

            // Remove o prefixo /storage/ se existir
            $path = str_replace('/storage/', '', $path);

            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);

                return response()->json([
                    'success' => true,
                    'message' => 'Imagem deletada com sucesso'
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Imagem não encontrada'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao deletar imagem',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Lista todas as imagens de uma pasta
     */
    public function list(Request $request)
    {
        $folder = $request->query('folder', 'general');

        try {
            $files = Storage::disk('public')->files("images/{$folder}");

            $images = array_map(function ($file) {
                return [
                    'filename' => basename($file),
                    'path' => $file,
                    'url' => Storage::url($file),
                    'fullUrl' => url(Storage::url($file)),
                    'size' => Storage::disk('public')->size($file),
                    'lastModified' => Storage::disk('public')->lastModified($file),
                ];
            }, $files);

            return response()->json([
                'success' => true,
                'data' => array_values($images)
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao listar imagens',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
