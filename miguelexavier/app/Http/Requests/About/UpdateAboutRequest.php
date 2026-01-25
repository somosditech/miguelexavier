<?php

namespace App\Http\Requests\About;

use Illuminate\Foundation\Http\FormRequest;
class UpdateAboutRequest extends FormRequest
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
            'title' => 'sometimes|string|max:255',
            'subtitle' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'image_url' => 'sometimes|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'string'   => 'O campo :attribute não pode ser vazio.',
            'max'      => 'O campo :attribute não pode passar de :max caracteres.',
        ];
    }

    public function attributes(): array
    {
        return [
            'title'       => 'Título',
            'subtitle'    => 'Subtítulo',
            'description' => 'Descrição',
            'image_url'   => 'Foto',
        ];
    }
}
