<?php

namespace App\Http\Requests\Item;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemRequest extends FormRequest
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
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'icon' => 'required|string|max:50',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'features' => 'required|array',
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'specialization' => 'required|string|max:255',
            'oab' => 'required|string|max:50',
            'image_url' => 'nullable|string|max:500',
            'linkedin_url' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'O campo :attribute é obrigatório.',
            'string'   => 'O campo :attribute não pode ser vazio.',
            'max'      => 'O campo :attribute não pode passar de :max caracteres.',
            'integer'  => 'O campo :attribute deve ser um número inteiro.',
            'features.array' => 'Os recursos devem ser enviados como uma lista.',
            'email'    => 'O campo :attribute deve ser um email válido.',
        ];
    }

    public function attributes(): array
    {
        return [
            'icon'        => 'Ícone',
            'title'       => 'Título',
            'description' => 'Descrição',
            'features'    => 'Features',
            'name'        => 'Nome',
            'role'        => 'Cargo',
            'specialization' => 'Especialização',
            'oab'         => 'OAB',
            'image_url'   => 'URL da foto',
            'linkedin_url' => 'LinkedIn',
            'email'       => 'Email',
        ];
    }
}
