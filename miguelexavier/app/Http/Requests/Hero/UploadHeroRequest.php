<?php

namespace App\Http\Requests\Hero;

use Illuminate\Foundation\Http\FormRequest;

class UploadHeroRequest extends FormRequest
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
            'background_image' => 'required|image|mimes:jpeg,png,jpg|max:5120',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'background_image.required' => 'Selecione uma foto para fazer upload.',
            'background_image.image' => 'O arquivo deve ser uma imagem.',
            'background_image.mimes' => 'A foto deve ser do tipo: JPEG, PNG ou JPG.',
            'background_image.max' => 'A foto não pode ser maior que 5MB.',
        ];
    }
}
