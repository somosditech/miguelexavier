<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\WhatsApp\UpdateWhatsAppRequest;
use App\Http\Requests\WhatsApp\StoreWhatsAppRequest;
use App\Http\Controllers\Controller;
use App\Models\WhatsAppSetting;

class WhatsAppController extends Controller
{
    /**
     * Display the current WhatsApp settings.
     */
    public function index()
    {
        $settings = WhatsAppSetting::first();
        return response()->json([
            'success' => true,
            'data' => $settings
        ]);
    }

    /**
     * Store new WhatsApp settings.
     */
    public function store(StoreWhatsAppRequest $request)
    {
        $validated = $request->validated();
        $settings = WhatsAppSetting::create($validated);
        return response()->json([
            'success' => true,
            'message' => 'Configurações do WhatsApp criadas com sucesso.',
            'data' => $settings
        ], 201);
    }

    /**
     * Update existing WhatsApp settings.
     */
    public function update(UpdateWhatsAppRequest $request)
    {
        $settings = WhatsAppSetting::first();
        if (!$settings) {
            return response()->json([
                'success' => false,
                'message' => 'Configurações do WhatsApp não encontradas.'
            ], 404);
        }
        $validated = $request->validated();
        $settings->update($validated);
        return response()->json([
            'success' => true,
            'message' => 'Configurações do WhatsApp atualizadas com sucesso.',
            'data' => $settings
        ]);
    }
}
?>
