<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne; // <-- Nuevo USE

class Persona extends Authenticatable
{
    // Y esta es la línea que le dice a la clase que los use.
    use HasApiTokens, Notifiable;

    protected $table = 'personas';
    protected $primaryKey = 'id_persona';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'nombre', 'apellido_paterno', 'apellido_materno',
        'correo_electronico', 'contrasenia', 'ci', 'activo',
    ];

    protected $hidden = ['contrasenia'];

    public function getAuthPassword()
    {
        return $this->contrasenia;
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Rol::class, 'persona_rol', 'id_persona', 'id_rol')
            ->withPivot('asignado_en');
    }

    public function hasRole(string $nombreRol): bool
    {
        return $this->roles()->where('nombre', $nombreRol)->exists();
    }

    /**
     * Una Persona puede tener un registro de Donante asociado.
     * La clave externa es 'persona_id' en la tabla 'donantes'.
     */
    public function donante(): HasOne
    {
        return $this->hasOne(Donante::class, 'persona_id', 'id_persona');
    }
}