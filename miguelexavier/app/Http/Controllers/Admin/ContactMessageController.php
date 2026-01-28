<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\ContactMessage;

class ContactMessageController extends Controller
{
    /**
     * Listar todas as mensagens de contato
     */
    public function index()
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->where('excluded', false)->get();
        
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
     * Buscar quantidade de mensagens não lidas
     */
    public function countUnread()
    {
        $message = ContactMessage::where('read_at', null)->count();

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

    /**
     * Buscar estatísticas de mensagens
     */
    public function getStats()
    {
        // Mensagens dos últimos 7 dias
        $last7Days = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $count = ContactMessage::whereDate('created_at', $date)->count();
            $last7Days[] = [
                'date' => $date,
                'count' => $count,
                'label' => now()->subDays($i)->format('d/m')
            ];
        }

        return response()->json([
            'success' => true,
            'data' => [
                'last7Days' => $last7Days
            ]
        ]);
    }

    /**
     * Excluir mensagem
     */
    public function delete($id)
    {
        $message = ContactMessage::find($id);

        if (!$message) {
            return response()->json([
                'success' => false,
                'message' => 'Mensagem não encontrada'
            ], 404);
        }

        $message->update([
            'excluded' => true,
            'read_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Mensagem excluída',
            'data' => $message
        ]);
    }
}
