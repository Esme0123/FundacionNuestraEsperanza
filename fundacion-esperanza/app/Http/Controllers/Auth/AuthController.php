<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\Persona;
use App\Models\Rol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        try {
            $persona = new Persona();
            $persona->nombre = $data['nombre'];
            $persona->apellido_paterno = $data['apellido_paterno'] ?? null;
            $persona->apellido_materno = $data['apellido_materno'] ?? null;
            $persona->correo_electronico = $data['correo_electronico'];
            $persona->contrasenia = Hash::make($data['password']);
            $persona->ci = $data['ci'] ?? null;
            $persona->activo = 1;
            $persona->save();

            $roles = $data['roles'] ?? ['viewer'];
            $ids = Rol::whereIn('nombre', $roles)->pluck('id_rol');
            if ($ids->isNotEmpty()) {
                $persona->roles()->syncWithoutDetaching($ids->all());
            }

            $token = $persona->createToken('api')->plainTextToken;

            return response()->json([
                'message' => 'Registrado correctamente',
                'data' => [
                    'token' => $token,
                    'user' => [
                        'id' => $persona->id_persona,
                        'nombre' => $persona->nombre,
                        'correo_electronico' => $persona->correo_electronico,
                        'roles' => $persona->roles()->pluck('nombre'),
                    ],
                ],
            ], 201);
        } catch (\Throwable $e) {
            Log::error('Error al registrar usuario', [
                'correo_electronico' => $request->input('correo_electronico'),
                'exception' => $e,
            ]);

            return response()->json(['message' => 'Error interno al registrar usuario'], 500);
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $persona = Persona::where('correo_electronico', $request->correo_electronico)->first();
        } catch (\Throwable $e) {
            Log::error('Error al consultar usuario durante login', [
                'correo_electronico' => $request->correo_electronico,
                'exception' => $e,
            ]);

            return response()->json(['message' => 'Error interno al iniciar sesion'], 500);
        }

        if (!$persona || !Hash::check($request->password, $persona->contrasenia)) {
            return response()->json(['message' => 'Credenciales invalidas'], 401);
        }

        if (!$persona->activo) {
            return response()->json(['message' => 'Usuario inactivo'], 403);
        }

        try {
            $token = $persona->createToken('api')->plainTextToken;
        } catch (\Throwable $e) {
            Log::error('Error al generar token en login', [
                'id_persona' => $persona->id_persona ?? null,
                'exception' => $e,
            ]);

            return response()->json(['message' => 'Error interno al iniciar sesion'], 500);
        }

        return response()->json([
            'message' => 'Login exitoso',
            'data' => [
                'token' => $token,
                'user' => [
                    'id' => $persona->id_persona,
                    'nombre' => $persona->nombre,
                    'correo_electronico' => $persona->correo_electronico,
                    'roles' => $persona->roles()->pluck('nombre'),
                ],
            ],
        ]);
    }

    public function me(Request $request)
    {
        $u = $request->user();

        return response()->json([
            'data' => [
                'id' => $u->id_persona,
                'nombre' => $u->nombre,
                'correo_electronico' => $u->correo_electronico,
                'roles' => $u->roles()->pluck('nombre'),
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sesion cerrada']);
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        try {
            $persona = $request->user();

            // Verificar que la contraseña actual sea correcta
            if (!Hash::check($request->password_actual, $persona->contrasenia)) {
                return response()->json(['message' => 'La contraseña actual es incorrecta'], 401);
            }

            // Actualizar la contraseña
            $persona->contrasenia = Hash::make($request->password_nueva);
            $persona->save();

            // Revocar todos los tokens existentes para forzar relogueo
            $persona->tokens()->delete();

            return response()->json([
                'message' => 'Contraseña actualizada correctamente. Por favor inicia sesión nuevamente.',
            ]);
        } catch (\Throwable $e) {
            Log::error('Error al cambiar contraseña', [
                'id_persona' => $request->user()->id_persona ?? null,
                'exception' => $e,
            ]);

            return response()->json(['message' => 'Error interno al cambiar contraseña'], 500);
        }
    }
}
