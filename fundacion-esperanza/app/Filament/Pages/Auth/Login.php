<?php

namespace App\Filament\Pages\Auth;

use Filament\Pages\Auth\Login as BaseLogin;

class Login extends BaseLogin
{
    // Esta función intercepta los datos del formulario
    protected function getCredentialsFromFormData(array $data): array
    {
        return [
            
            'correo_electronico' => $data['email'],
            
            'password' => $data['password'], 
        ];
    }
}