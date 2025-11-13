<?php
//integracion de momento, corregir y adaptar despues a los requisitos del proyecto
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Campania extends Model
{
    protected $table = 'campanias';
    protected $primaryKey = 'id_campania';

    // La tabla SÍ tiene timestamps (created_at, updated_at)
    public $timestamps = true;

    protected $fillable = [
        'nombre',
        'slug',
        'tipo',
        'descripcion',
        'id_tipo_moneda',
        'objetivo_monetario',
        'fecha_inicio',
        'fecha_fin',
        'estado_campania',
    ];

    /**
     * Define los campos que deben ser casteados a tipos nativos.
     */
    protected $casts = [
        'objetivo_monetario' => 'decimal:2',
        'fecha_inicio' => 'date',
        'fecha_fin' => 'date',
    ];

    /**
     * Una campaña puede tener muchas donaciones.
     */
    public function donaciones(): HasMany
    {
        return $this->hasMany(Donacion::class, 'id_campania', 'id_campania');
    }

    /**
     * Una campaña pertenece a un tipo de moneda.
     */
    public function tipoMoneda(): BelongsTo
    {
        return $this->belongsTo(TipoMoneda::class, 'id_tipo_moneda', 'id_tipo_moneda');
    }
}