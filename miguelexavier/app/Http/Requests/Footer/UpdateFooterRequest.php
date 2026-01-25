<?php

namespace App\Http\Requests\Footer;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFooterRequest extends FormRequest
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
            'about_title' => 'sometimes|string|max:255',
            'about_description' => 'sometimes|string',
            'contact_title' => 'sometimes|string|max:255',
            'contact_address' => 'sometimes|string|max:500',
            'contact_phone' => 'sometimes|string|max:20',
            'contact_email' => 'sometimes|email|max:255',
            'contact_hours' => 'sometimes|string|max:255',
            'social_links' => 'sometimes|array',
            'legal_links' => 'sometimes|array',
            'privacy_policy_content' => 'sometimes|string',
            'terms_of_use_content' => 'sometimes|string',
        ];
    }

    public function messages(): array
    {
        return [
            'string'   => 'O campo :attribute não pode ser vazio.',
            'max'      => 'O campo :attribute não pode passar de :max caracteres.',
            'email'    => 'O campo :attribute deve ser um email válido.',
            'array'    => 'O campo :attribute deve ser uma lista.',
        ];
    }

    public function attributes(): array
    {
        return [
            'about_title'       => 'Título',
            'about_description' => 'Descrição',
            'contact_title'     => 'Título',
            'contact_address'   => 'Endereço',
            'contact_phone'     => 'Telefone',
            'contact_email'     => 'Email',
            'contact_hours'     => 'Horário de Atendimento',
            'social_links'      => 'Links Sociais',
            'legal_links'       => 'Links Legais',
            'privacy_policy_content' => 'Política de Privacidade',
            'terms_of_use_content' => 'Termos de Uso',
        ];
    }
}
