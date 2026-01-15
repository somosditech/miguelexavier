<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Team\UpdateTeamMemberRequest;
use App\Http\Requests\Team\StoreTeamMemberRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\TeamMember;

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
    public function store(StoreTeamMemberRequest $request)
    {
        $validated = $request->validated();

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
    public function update(UpdateTeamMemberRequest $request, $id)
    {
        $member = TeamMember::find($id);

        if (!$member) {
            return response()->json([
                'success' => false,
                'message' => 'Membro não encontrado'
            ], 404);
        }

        $validated = $request->validated();

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

        // Deletar foto se existir
        if ($member->image_url && Storage::disk('public')->exists($member->image_url)) {
            Storage::disk('public')->delete($member->image_url);
        }

        $member->delete();

        return response()->json([
            'success' => true,
            'message' => 'Membro deletado com sucesso'
        ]);
    }
}
