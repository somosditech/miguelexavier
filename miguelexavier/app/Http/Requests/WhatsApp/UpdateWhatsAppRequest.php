<?php

namespace App\Http\Requests\WhatsApp;

use Illuminate\Foundation\Http\FormRequest;

class UpdateWhatsAppRequest extends FormRequest
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
            'phone_number' => 'required|string|min:13|max:15|regex:/^\+?[1-9]\d{12,14}$/',
            'predefined_message' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'O campo :attribute é obrigatório.',
            'string' => 'O campo :attribute deve ser uma string.',
            'max' => 'O campo :attribute não pode exceder :max caracteres.',
            'min' => 'O campo :attribute deve ter pelo menos :min caracteres.',
            'regex' => 'O campo :attribute deve ter um formato válido.',
        ];
    }

    public function attributes(): array
    {
        return [
            'phone_number' => 'Número do WhatsApp',
            'predefined_message' => 'Mensagem pré-definida',
        ];
    }
}
?>