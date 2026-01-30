<?php

namespace App\Http\Requests\Hero;

use Illuminate\Foundation\Http\FormRequest;
class UpdateHeroRequest extends FormRequest
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
            'subtitle' => 'nullable|string|max:255',
            'description' => 'sometimes|string',
            'background_image_url' => 'sometimes|string|max:255',
            'cta_button_text' => 'sometimes|string|max:100',
            'cta_button_href' => 'nullable|string|max:255',
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
            'title'                  => 'Título',
            'subtitle'               => 'Subtítulo',
            'description'            => 'Descrição',
            'background_image_url'   => 'Imagem de fundo',
            'cta_button_text'        => 'Texto do botão',
            'cta_button_href'        => 'Link do botão',
        ];
    }
}
