<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    /**
     * Listar todas as mensagens de contato
     */
    public function index()
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();
        
        return response()->json([
            'success' => true,
            'data' => $messages
        ]);
    }

    /**
     * Buscar uma mensagem específica
     */
    public function show($id)
    {
        $message = ContactMessage::find($id);

        if (!$message) {
            return response()->json([
                'success' => false,
                'message' => 'Mensagem não encontrada'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $message
        ]);
    }

    /**
     * Marcar mensagem como lida
     */
    public function markAsRead($id)
    {
        $message = ContactMessage::find($id);

        if (!$message) {
            return response()->json([
                'success' => false,
                'message' => 'Mensagem não encontrada'
            ], 404);
        }

        $message->update([
            'read_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Mensagem marcada como lida',
            'data' => $message
        ]);
    }
}
