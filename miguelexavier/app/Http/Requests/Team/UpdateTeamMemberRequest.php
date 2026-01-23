<?php

namespace App\Http\Requests\Team;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTeamMemberRequest extends FormRequest
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
            'name' => 'sometimes|string|max:255',
            'role' => 'sometimes|string|max:255',
            'specialization' => 'sometimes|string|max:255',
            'oab' => 'sometimes|string|max:50',
            'description' => 'sometimes|string',
            'image_url' => 'nullable|string|max:500',
            'lattes_url' => 'nullable|string|max:255',
            'email' => 'sometimes|email|max:255',
            'order' => 'sometimes|integer',
        ];
    }

    public function messages(): array
    {
        return [
            'string'   => 'O campo :attribute não pode ser vazio.',
            'max'      => 'O campo :attribute não pode passar de :max caracteres.',
            'integer'  => 'O campo :attribute deve ser um número inteiro.',
            'email'    => 'O campo :attribute deve ser um email válido.',
        ];
    }

    public function attributes(): array
    {
        return [
            'name'           => 'Nome',
            'role'           => 'Cargo',
            'specialization' => 'Especialização',
            'oab'            => 'OAB',
            'description'    => 'Descrição',
            'image_url'      => 'URL da foto',
            'lattes_url'     => 'Lattes',
            'email'          => 'Email',
            'order'          => 'Ordem',
        ];
    }
}
