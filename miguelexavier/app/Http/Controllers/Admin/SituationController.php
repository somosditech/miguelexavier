<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Situations\SituationsRequest;
use App\Models\Situation;

class SituationController extends Controller
{
    /**
     * Buscar Situação (Singleton)
     */
    public function show()
    {
        $situation = Situation::first();

        // Se não existir, retornar objeto vazio ou padrão
        if (!$situation) {
            return response()->json([
                'success' => true,
                'data' => [
                    'title' => '',
                    'message' => '',
                    'content' => [],
                    'cta_button_text' => 'QUERO ORIENTAÇÃO JURÍDICA'
                ]
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $situation
        ]);
    }

    /**
     * Atualizar ou Criar Situação
     */
    public function update(SituationsRequest $request)
    {
        $validated = $request->validated();
        
        $situation = Situation::first();

        if ($situation) {
            $situation->update($validated);
        } else {
            $situation = Situation::create($validated);
        }

        return response()->json([
            'success' => true,
            'message' => 'Dados atualizados com sucesso',
            'data' => $situation
        ]);
    }

    /**
     * Deletar (opcional, mas mantido para cumprir API)
     */
    public function destroy($id)
    {
        $situation = Situation::find($id);
        if ($situation) {
            $situation->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Deletado com sucesso'
        ]);
    }
}
