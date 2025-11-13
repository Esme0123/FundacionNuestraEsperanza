<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool { return true; }
    public function rules(): array {
        return [
            'nombre' => ['required','string','max:50'],
            'apellido_paterno' => ['nullable','string','max:50'],
            'apellido_materno' => ['nullable','string','max:50'],
            'correo_electronico' => ['required','email','max:150','unique:personas,correo_electronico'],
            'password' => ['required','string','min:8','confirmed'],
            'ci' => ['nullable','string','max:50'],
            'roles' => ['sometimes','array'],
            'roles.*' => ['string','max:50'],
        ];
    }
}
