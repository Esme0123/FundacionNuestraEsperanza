<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Persona;
use App\Models\Rol;
use Illuminate\Http\Request;

class RolesController extends Controller
{
    public function index()
    {
        return response()->json(['data' => Rol::select('id_rol','nombre','descripcion')->get()]);
    }

    public function assign(Request $request, int $idPersona)
    {
        $request->validate(['roles' => ['required','array'], 'roles.*' => ['string']]);
        $persona = Persona::findOrFail($idPersona);
        $ids = Rol::whereIn('nombre', $request->roles)->pluck('id_rol')->all();
        $persona->roles()->syncWithoutDetaching($ids);
        return response()->json(['message' => 'Roles asignados']);
    }

    public function revoke(Request $request, int $idPersona)
    {
        $request->validate(['roles' => ['required','array'], 'roles.*' => ['string']]);
        $persona = Persona::findOrFail($idPersona);
        $ids = Rol::whereIn('nombre', $request->roles)->pluck('id_rol')->all();
        $persona->roles()->detach($ids);
        return response()->json(['message' => 'Roles revocados']);
    }
}
