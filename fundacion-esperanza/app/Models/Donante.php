<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute; // Importante para el accesor

class Donante extends Model
{
    protected $table = 'donantes';
    protected $primaryKey = 'id_donante';

    // CORREGIDO: Tu tabla SÍ tiene timestamps
    public $timestamps = true; 

    protected $fillable = [
        'persona_id', // <-- CORREGIDO (en lugar de id_persona)
        'nombre', // <-- CORREGIDO (en lugar de nombre_completo)
        'apellido', // <-- CORREGIDO (añadido)
        'email',
        'telefono',
        // 'id_proveedor_pago', // <-- Esta columna NO existe en tu SQL
    ];

    /**
     * Un donante puede estar vinculado a una cuenta de usuario (Persona).
     */
    public function persona(): BelongsTo
    {
        // CORREGIDO: la clave foránea es 'persona_id'
        return $this->belongsTo(Persona::class, 'persona_id', 'id_persona');
    }

    /**
     * Un donante puede realizar muchas donaciones.
     */
    public function donaciones(): HasMany
    {
        return $this->hasMany(Donacion::class, 'id_donante', 'id_donante');
    }

    /**
     * Accessor para obtener el nombre completo.
     * (Usado en el CertificadoService: $donacion->donante->nombre_completo)
     * Esto nos permite no cambiar el CertificadoService.
     */
    protected function nombreCompleto(): Attribute
    {
        return Attribute::make(
            get: fn () => trim($this->nombre . ' ' . $this->apellido),
        );
    }
}