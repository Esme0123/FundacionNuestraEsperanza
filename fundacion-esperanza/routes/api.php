<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RolesController;
use App\Http\Controllers\DonacionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Rutas de Autenticación (Públicas)
|--------------------------------------------------------------------------
|
| Estas rutas son para que cualquiera pueda registrarse o iniciar sesión.
|
*/
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    /*
    |--------------------------------------------------------------------------
    | Rutas de Usuario (Protegidas)
    |--------------------------------------------------------------------------
    |
    | Estas rutas requieren que el usuario envíe un Token de API válido.
    | El middleware 'auth:sanctum' se encarga de esta protección.
    |
    */
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('change-password', [AuthController::class, 'changePassword']);

        // RUTA para el Panel de Donante
        // Endpoint: GET /api/donaciones/mis
        Route::get('donaciones/mis', [DonacionController::class, 'misDonaciones']);
    });
    
});


/*
|--------------------------------------------------------------------------
| Rutas de Administración (Protegidas por Rol)
|--------------------------------------------------------------------------
|
| Estas rutas tienen DOBLE protección:
| 1. 'auth:sanctum': El usuario debe estar logueado.
| 2. 'role:admin': El usuario debe tener el rol de "admin" (nuestro middleware).
|
*/
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('roles', [RolesController::class, 'index']);
    Route::post('personas/{idPersona}/roles/assign', [RolesController::class, 'assign']);
    Route::post('personas/{idPersona}/roles/revoke', [RolesController::class, 'revoke']);
});