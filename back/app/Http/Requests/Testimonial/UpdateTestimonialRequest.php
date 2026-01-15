<?php

namespace App\Http\Requests\Testimonial;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTestimonialRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name'  => 'sometimes|string|max:255',
            'role'  => 'sometimes|string|max:255',
            'text'  => 'sometimes|string',
            'order' => 'sometimes|integer|min:0',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'required' => 'O campo :attribute é obrigatório.',
            'string'   => 'O campo :attribute não pode ser vazio.',
            'max'      => 'O campo :attribute não pode ter mais de :max caracteres.',
            'integer'  => 'O campo :attribute deve ser um número inteiro.',
            'min'      => 'O campo :attribute deve ser no mínimo :min.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'name'  => 'Nome',
            'role'  => 'Profissão/Cargo',
            'text'  => 'Depoimento',
            'order' => 'Ordem',
        ];
    }
}
