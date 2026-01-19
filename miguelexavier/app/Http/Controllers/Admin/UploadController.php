<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

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

    /**
     * Upload de foto de membro da equipe
     */
    public function uploadTeamPhoto(Request $request)
    {
        Log::info('Upload de foto de membro iniciado');
        
        try {
            Log::info('Validando arquivo');
            $request->validate([
                'photo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'member_id' => 'nullable|integer|exists:team_members,id'
            ]);
            
            Log::info('Arquivo validado com sucesso');

            // Se member_id for fornecido, deletar foto anterior
            if ($request->member_id) {
                $member = \App\Models\TeamMember::find($request->member_id);
                if ($member && $member->image_url && Storage::disk('public')->exists($member->image_url)) {
                    Storage::disk('public')->delete($member->image_url);
                    Log::info('Foto anterior deletada: ' . $member->image_url);
                }
            }

            // Salva nova foto
            Log::info('Salvando nova foto');
            $path = $request->file('photo')->store('team_photos', 'public');
            Log::info('Foto salva em: ' . $path);

            return response()->json([
                'success' => true,
                'message' => 'Foto enviada com sucesso',
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
            Log::error('Erro ao enviar foto: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return response()->json([
                'success' => false,
                'message' => 'Erro ao enviar foto: ' . $e->getMessage()
            ], 500);
        }
    }
}
