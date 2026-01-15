<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Footer\UpdateFooterRequest;
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
    public function update(UpdateFooterRequest $request)
    {
        $validated = $request->validated();
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
