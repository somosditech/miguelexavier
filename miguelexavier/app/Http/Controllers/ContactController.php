<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactMessage;
use Illuminate\Support\Facades\Mail;
use App\Events\NewContactMessage;
use App\Services\ContactRateLimiter;

class ContactController extends Controller
{
    protected $rateLimiter;

    public function __construct(ContactRateLimiter $rateLimiter)
    {
        $this->rateLimiter = $rateLimiter;
    }

    /**
     * Recebe mensagem do formulário de contato
     */
    public function store(Request $request)
    {
        // Verifica rate limiting por IP
        if (!$this->rateLimiter->canSubmit($request)) {
            $availableIn = $this->rateLimiter->availableIn($request);
            $minutes = ceil($availableIn / 60);
            
            return response()->json([
                'success' => false,
                'message' => "Você atingiu o limite de envios. Tente novamente em {$minutes} minutos.",
                'retry_after' => $availableIn
            ], 429);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string',
        ]);

        $validated['excluded'] = false;

        $contactMessage = ContactMessage::create($validated);

        // Registra a tentativa de envio
        $this->rateLimiter->hit($request);

        // Disparar evento para notificar admin em tempo real
        event(new NewContactMessage($contactMessage));

        // TODO: Enviar email para o escritório
        // Mail::to('contato@miguelxavier.adv.br')->send(new ContactFormMail($contactMessage));

        return response()->json([
            'success' => true,
            'message' => 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
            'data' => $contactMessage
        ], 201);
    }
}