<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    /**
     * Listar todos os depoimentos
     */
    public function index()
    {
        $testimonials = Testimonial::orderBy('order')->get();
        
        return response()->json([
            'success' => true,
            'data' => $testimonials
        ]);
    }

    /**
     * Criar novo depoimento
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'text' => 'required|string',
            'order' => 'required|integer',
        ]);

        $testimonial = Testimonial::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Depoimento criado com sucesso',
            'data' => $testimonial
        ], 201);
    }

    /**
     * Buscar um depoimento específico
     */
    public function show($id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return response()->json([
                'success' => false,
                'message' => 'Depoimento não encontrado'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $testimonial
        ]);
    }

    /**
     * Atualizar depoimento
     */
    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return response()->json([
                'success' => false,
                'message' => 'Depoimento não encontrado'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'role' => 'sometimes|string|max:255',
            'text' => 'sometimes|string',
            'order' => 'sometimes|integer',
        ]);

        $testimonial->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Depoimento atualizado com sucesso',
            'data' => $testimonial
        ]);
    }

    /**
     * Deletar depoimento
     */
    public function destroy($id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return response()->json([
                'success' => false,
                'message' => 'Depoimento não encontrado'
            ], 404);
        }

        $testimonial->delete();

        return response()->json([
            'success' => true,
            'message' => 'Depoimento deletado com sucesso'
        ]);
    }
}
