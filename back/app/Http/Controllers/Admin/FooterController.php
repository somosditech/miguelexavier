<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FooterContent;
use Illuminate\Http\Request;

class FooterController extends Controller
{
    /**
     * Buscar footer
     */
    public function show()
    {
        $footer = FooterContent::first();
        
        if (!$footer) {
            return response()->json([
                'success' => false,
                'message' => 'Footer não encontrado'
            ], 404);
        }
        
        return response()->json([
            'success' => true,
            'data' => $footer
        ]);
    }
    
    /**
     * Atualizar footer
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'about_title' => 'sometimes|string|max:255',
            'about_description' => 'sometimes|string',
            'contact_title' => 'sometimes|string|max:255',
            'contact_address' => 'sometimes|string|max:500',
            'contact_phone' => 'sometimes|string|max:20',
            'contact_email' => 'sometimes|email|max:255',
            'contact_hours' => 'sometimes|string|max:255',
            'social_links' => 'sometimes|array',
            'legal_links' => 'sometimes|array',
            'copyright_text' => 'sometimes|string|max:255',
        ]);
        
        $footer = FooterContent::first();
        
        if (!$footer) {
            return response()->json([
                'success' => false,
                'message' => 'Footer não encontrado'
            ], 404);
        }
        
        $footer->update($validated);
        
        return response()->json([
            'success' => true,
            'message' => 'Footer atualizado com sucesso',
            'data' => $footer
        ]);
    }
}
