<?php

namespace App\Http\Requests\Team;

use Illuminate\Foundation\Http\FormRequest;

class StoreTeamMemberRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'specialization' => 'required|string|max:255',
            'oab' => 'required|string|max:50',
            'description' => 'required|string',
            'image_url' => 'sometimes|string|max:500',
            'lattes_url' => 'sometimes|string|max:255',
            'email' => 'required|email|max:255',
            'order' => 'required|integer',
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'O campo :attribute é obrigatório.',
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
            'image_url'      => 'Foto',
            'lattes_url'     => 'Lattes',
            'email'          => 'Email',
            'order'          => 'Ordem',
        ];
    }
}
