<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ServiceWork\ServiceWorkRequest;
use App\Http\Controllers\Controller;
use App\Models\ServiceWork;

class ServiceWorkController extends Controller
{
    /**
     * Buscar Fluxo de Atendimento (Singleton)
     */
    public function show()
    {
        $serviceWork = ServiceWork::first();

        if (!$serviceWork) {
            return response()->json([
                'success' => true,
                'data' => [
                    'title' => 'COMO FUNCIONA O ATENDIMENTO?',
                    'content' => [],
                    'cta_button_text' => 'Entre em contato'
                ]
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $serviceWork
        ]);
    }

    /**
     * Atualizar ou Criar Fluxo de Atendimento
     */
    public function update(ServiceWorkRequest $request)
    {
        $validated = $request->validated();
        
        $serviceWork = ServiceWork::first();

        if ($serviceWork) {
            $serviceWork->update($validated);
        } else {
            $serviceWork = ServiceWork::create($validated);
        }

        return response()->json([
            'success' => true,
            'message' => 'Dados atualizados com sucesso',
            'data' => $serviceWork
        ]);
    }

    /**
     * Deletar
     */
    public function destroy($id)
    {
        $serviceWork = ServiceWork::find($id);
        if ($serviceWork) {
            $serviceWork->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Deletado com sucesso'
        ]);
    }
}