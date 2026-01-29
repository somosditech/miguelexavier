<?php

namespace App\Http\Requests\Situations;

use Illuminate\Foundation\Http\FormRequest;

class SituationsRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'content' => 'required|array',
            'message' => 'required|string',
            'cta_button_text' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'O campo :attribute é obrigatório.',
            'string'   => 'O campo :attribute não pode ser vazio.',
            'max'      => 'O campo :attribute não pode passar de :max caracteres.',
            'content.array' => 'O conteúdo deve ser enviado como uma lista.',
        ];
    }
}
