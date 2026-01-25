<?php

namespace App\Http\Requests\Theme;

use Illuminate\Foundation\Http\FormRequest;

class StoreThemeRequest extends FormRequest
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
            'primary_color' => 'required|string|max:255',
            'secondary_color' => 'required|string|max:255',
            'accent_color' => 'required|string|max:255',
            'background_color' => 'required|string|max:255',
            'background_image_url' => 'sometimes|string|max:500',
            'logo_url' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'O campo :attribute é obrigatório.',
            'string'   => 'O campo :attribute não pode ser vazio.',
            'max'      => 'O campo :attribute não pode passar de :max caracteres.',
        ];
    }

    public function attributes(): array
    {
        return [
            'primary_color'                  => 'Cor Primária',
            'secondary_color'                => 'Cor Secundária',
            'accent_color'                   => 'Cor Acento',
            'background_color'               => 'Cor de Fundo',
            'background_image_url'           => 'Imagem de fundo',
            'logo_url'                       => 'Logo',
        ];
    }
}
