<?php

namespace App\Http\Requests\Item;

use Illuminate\Foundation\Http\FormRequest;

class UpdateItemRequest extends FormRequest
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
            'icon' => 'sometimes|string|max:50',
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'features' => 'sometimes|array',
            'order' => 'sometimes|integer',
        ];
    }

    public function messages(): array
    {
        return [
            'string'   => 'O campo :attribute não pode ser vazio.',
            'max'      => 'O campo :attribute não pode passar de :max caracteres.',
            'integer'  => 'O campo :attribute deve ser um número inteiro.',
            'features.array' => 'Os recursos devem ser enviados como uma lista.',
        ];
    }

    public function attributes(): array
    {
        return [
            'icon'        => 'Ícone',
            'title'       => 'Título',
            'description' => 'Descrição',
            'features'    => 'Features',
            'order'       => 'Ordem',
        ];
    }
}
