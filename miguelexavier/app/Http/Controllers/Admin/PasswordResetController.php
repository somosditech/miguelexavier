<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordReset\SendResetLinkRequest;
use App\Http\Requests\PasswordReset\ResetPasswordRequest;
use App\Models\User;
use App\Notifications\PasswordResetNotification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PasswordResetController extends Controller
{
    /**
     * Enviar link de redefinição de senha
     */
    public function sendResetLink(SendResetLinkRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        // Gerar token único
        $token = Str::random(64);

        // Deletar tokens antigos para este email
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        // Criar novo token
        DB::table('password_reset_tokens')->insert([
            'email' => $request->email,
            'token' => Hash::make($token),
            'created_at' => now(),
        ]);

        // Enviar email
        try {
            $user->notify(new PasswordResetNotification($token));
            
            return response()->json([
                'message' => 'Link de redefinição enviado para seu email!'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao enviar email. Tente novamente mais tarde.'
            ], 500);
        }
    }

    /**
     * Redefinir senha
     */
    public function reset(ResetPasswordRequest $request)
    {
        // Buscar token no banco
        $passwordReset = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        // Verificar se token existe
        if (!$passwordReset) {
            return response()->json([
                'message' => 'Token inválido ou expirado.'
            ], 400);
        }

        // Verificar se token está expirado (60 minutos)
        if (now()->diffInMinutes($passwordReset->created_at) > 60) {
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();
            return response()->json([
                'message' => 'Token expirado. Solicite um novo link de redefinição.'
            ], 400);
        }

        // Verificar se token corresponde
        if (!Hash::check($request->token, $passwordReset->token)) {
            return response()->json([
                'message' => 'Token inválido.'
            ], 400);
        }

        // Atualizar senha
        $user = User::where('email', $request->email)->first();
        $user->update([
            'password' => Hash::make($request->password)
        ]);

        // Deletar token usado
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json([
            'message' => 'Senha redefinida com sucesso!'
        ], 200);
    }
}
