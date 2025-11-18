<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array {
        return [
            'password_actual' => ['required', 'string'],
            'password_nueva' => ['required', 'string', 'min:8', 'confirmed'],
            'password_nueva_confirmation' => ['required', 'string'],
        ];
    }

    public function messages(): array {
        return [
            'password_actual.required' => 'La contraseña actual es requerida',
            'password_nueva.required' => 'La nueva contraseña es requerida',
            'password_nueva.min' => 'La nueva contraseña debe tener al menos 8 caracteres',
            'password_nueva.confirmed' => 'Las contraseñas no coinciden',
            'password_nueva_confirmation.required' => 'La confirmación de contraseña es requerida',
        ];
    }
}
