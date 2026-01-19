<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Item\StoreItemRequest;
use App\Http\Requests\Item\UpdateItemRequest;
use App\Http\Controllers\Controller;
use App\Models\Service;

class ServiceController extends Controller
{
    /**
     * Listar todos os serviços
     */
    public function index()
    {
        $services = Service::orderBy('order')->get();
        
        return response()->json([
            'success' => true,
            'data' => $services
        ]);
    }

    /**
     * Criar novo serviço
     */
    public function store(StoreItemRequest $request)
    {
        $validated = $request->validated();

        $service = Service::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Serviço criado com sucesso',
            'data' => $service
        ], 201);
    }

    /**
     * Buscar um serviço específico
     */
    public function show($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Serviço não encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $service
        ]);
    }

    /**
     * Atualizar serviço
     */
    public function update(UpdateItemRequest $request, $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Serviço não encontrado'
            ], 404);
        }

        $validated = $request->validated();

        $service->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Serviço atualizado com sucesso',
            'data' => $service
        ]);
    }

    /**
     * Deletar serviço
     */
    public function destroy($id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Serviço não encontrado'
            ], 404);
        }

        $service->delete();

        return response()->json([
            'success' => true,
            'message' => 'Serviço deletado com sucesso'
        ]);
    }
}
