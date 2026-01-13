<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class UploadController extends Controller
{
    /**
     * Upload de logo
     */
    public function uploadLogo(Request $request)
    {
        Log::info('Upload logo iniciado');
        
        try {
            Log::info('Validando arquivo');
            $request->validate([
                'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            ]);
            
            Log::info('Arquivo validado com sucesso');

            $theme = \App\Models\Theme::first();
            
            if (!$theme) {
                Log::error('Tema não encontrado');
                return response()->json([
                    'success' => false,
                    'message' => 'Tema não encontrado'
                ], 404);
            }
            
            Log::info('Tema encontrado: ' . $theme->id);
            
            // Delete logo anterior se existir
            $oldLogo = $theme->logo_url;
            if ($oldLogo && Storage::disk('public')->exists($oldLogo)) {
                Storage::disk('public')->delete($oldLogo);
                Log::info('Logo anterior deletada: ' . $oldLogo);
            }

            // Salva nova logo
            Log::info('Salvando nova logo');
            $path = $request->file('logo')->store('logos', 'public');
            Log::info('Logo salva em: ' . $path);
            
            // Atualiza tema com novo caminho
            $theme->update(['logo_url' => $path]);
            Log::info('Tema atualizado com sucesso');

            return response()->json([
                'success' => true,
                'message' => 'Logo enviada com sucesso',
                'url' => Storage::url($path),
                'path' => $path
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Erro de validação: ' . json_encode($e->errors()));
            return response()->json([
                'success' => false,
                'message' => 'Arquivo inválido',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Erro ao enviar logo: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => 'Erro ao enviar logo: ' . $e->getMessage()
            ], 500);
        }
    }
}
