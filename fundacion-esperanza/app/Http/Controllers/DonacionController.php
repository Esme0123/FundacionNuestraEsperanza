<?php

namespace App\Http\Controllers;

use App\Http\Resources\DonacionResource;
use App\Models\Donante;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class DonacionController extends Controller
{
    /**
     * Obtiene el historial de donaciones del usuario autenticado.
     * Este endpoint requiere autenticación (ej. Sanctum, Passport, etc.).
     */
    public function misDonaciones(Request $request): JsonResource
    {
        // 1. Obtener la instancia de la Persona autenticada.
        // Asumimos que el usuario autenticado (Persona) tiene la relación 'donante'.
        $persona = Auth::user();

        // Verificar si la persona tiene un perfil de Donante
        if (!$persona || !$persona->donante) {
            // Si no está logueado o no es un donante, devolver un array vacío o un error 404/403
            return response()->json(['message' => 'No se encontró un perfil de donante asociado a este usuario.'], 404);
        }

        $donante = $persona->donante;

        // 2. Cargar todas las donaciones del donante, precargando (with) el certificado
        // y la información de la moneda para evitar problemas de N+1.
        $donaciones = $donante->donaciones()
            // Importante: Precargar las relaciones que se usarán en el Resource
            ->with(['certificado', 'tipoMoneda']) 
            ->where('estado', 'succeeded') // Solo donaciones exitosas
            ->orderBy('fecha', 'desc')
            ->get();

        // 3. Devolver la colección transformada con el Resource
        return DonacionResource::collection($donaciones);
    }
}