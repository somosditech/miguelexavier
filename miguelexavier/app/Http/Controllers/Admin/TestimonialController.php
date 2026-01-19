<?php

namespace App\Http\Controllers\Admin;


use App\Http\Requests\Testimonial\StoreTestimonialRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\Testimonial\UpdateTestimonialRequest;
use App\Models\Testimonial;

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
    public function store(StoreTestimonialRequest $request)
    {
        $validated = $request->validated();

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
    public function update(UpdateTestimonialRequest $request, $id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return response()->json([
                'success' => false,
                'message' => 'Depoimento não encontrado'
            ], 404);
        }

        $validated = $request->validated();

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
