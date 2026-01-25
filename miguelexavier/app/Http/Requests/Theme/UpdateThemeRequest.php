<?php

namespace App\Http\Requests\Theme;

use Illuminate\Foundation\Http\FormRequest;
class UpdateThemeRequest extends FormRequest
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
            'primary_color' => 'sometimes|string|max:255',
            'secondary_color' => 'sometimes|string|max:255',
            'accent_color' => 'sometimes|string|max:255',
            'background_color' => 'sometimes|string|max:255',
            'background_image_url' => 'sometimes|string|max:255',
            'logo_url' => 'sometimes|string|max:255',
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
            'primary_color'                  => 'Cor Primária',
            'secondary_color'                => 'Cor Secundária',
            'accent_color'                   => 'Cor Acento',
            'background_color'               => 'Cor de Fundo',
            'background_image_url'           => 'Imagem de fundo',
            'logo_url'                       => 'Logo',
        ];
    }
}
