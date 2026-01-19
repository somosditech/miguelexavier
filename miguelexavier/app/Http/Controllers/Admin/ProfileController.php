<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Http\Requests\Profile\UploadPhotoRequest;
use App\Http\Requests\Profile\VerifyAndUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Retorna os dados do perfil do usuário autenticado
     */
    public function show(Request $request)
    {
        $user = $request->user();
        
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'profile_photo' => $user->profile_photo,
            ]
        ]);
    }

    /**
     * Atualiza dados simples (nome) sem necessidade de verificação
     */
    public function update(UpdateProfileRequest $request)
    {
        $user = $request->user();
        $user->update([
            'name' => $request->name,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Perfil atualizado com sucesso!',
            'data' => [
                'name' => $user->name,
            ]
        ]);
    }

    /**
     * Upload de foto de perfil
     */
    public function uploadPhoto(UploadPhotoRequest $request)
    {
        $user = $request->user();

        // Remove foto antiga se existir
        if ($user->profile_photo) {
            Storage::disk('public')->delete($user->profile_photo);
        }

        // Salva nova foto
        $path = $request->file('photo')->store('profile-photos', 'public');
        
        $user->update([
            'profile_photo' => $path,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Foto atualizada com sucesso!',
            'data' => [
                'profile_photo' => $path,
            ]
        ]);
    }

    /**
     * Atualiza nome e/ou senha
     */
    public function verifyAndUpdate(VerifyAndUpdateRequest $request)
    {
        $user = $request->user();

        // Atualiza dados
        $updateData = [
            'name' => $request->name,
        ];
        
        if ($request->has('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $user->update($updateData);

        return response()->json([
            'success' => true,
            'message' => 'Dados atualizados com sucesso!',
            'data' => [
                'name' => $user->name,
            ]
        ]);
    }
}
