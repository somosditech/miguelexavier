<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamMemberController extends Controller
{
    /**
     * Listar todos os membros da equipe
     */
    public function index()
    {
        $members = TeamMember::orderBy('order')->get();
        
        return response()->json([
            'success' => true,
            'data' => $members
        ]);
    }

    /**
     * Criar novo membro
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'specialization' => 'required|string|max:255',
            'oab' => 'required|string|max:50',
            'description' => 'required|string',
            'image_url' => 'nullable|string|max:500',
            'linkedin_url' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'order' => 'required|integer',
        ]);

        $member = TeamMember::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Membro criado com sucesso',
            'data' => $member
        ], 201);
    }

    /**
     * Buscar um membro específico
     */
    public function show($id)
    {
        $member = TeamMember::find($id);

        if (!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Membro não encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $member
        ]);
    }

    /**
     * Atualizar membro
     */
    public function update(Request $request, $id)
    {
        $member = TeamMember::find($id);

        if (!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Membro não encontrado'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'role' => 'sometimes|string|max:255',
            'specialization' => 'sometimes|string|max:255',
            'oab' => 'sometimes|string|max:50',
            'description' => 'sometimes|string',
            'image_url' => 'nullable|string|max:500',
            'linkedin_url' => 'nullable|string|max:255',
            'email' => 'sometimes|email|max:255',
            'order' => 'sometimes|integer',
        ]);

        $member->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Membro atualizado com sucesso',
            'data' => $member
        ]);
    }

    /**
     * Deletar membro
     */
    public function destroy($id)
    {
        $member = TeamMember::find($id);

        if (!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Membro não encontrado'
            ], 404);
        }

        $member->delete();

        return response()->json([
            'success' => true,
            'message' => 'Membro deletado com sucesso'
        ]);
    }
}
