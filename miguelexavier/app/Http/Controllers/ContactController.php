<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactMessage;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Recebe mensagem do formulário de contato
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'area_interesse' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        // Salva mensagem no banco
        $contactMessage = ContactMessage::create($validated);

        // TODO: Enviar email para o escritório
        // Mail::to('contato@miguelxavier.adv.br')->send(new ContactFormMail($contactMessage));

        return response()->json([
            'success' => true,
            'message' => 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
            'data' => $contactMessage
        ], 201);
    }
}
