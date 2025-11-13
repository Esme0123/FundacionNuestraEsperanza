<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TipoMoneda extends Model
{
    protected $table = 'tipos_monedas';
    protected $primaryKey = 'id_tipo_moneda';
    
    // Tu tabla tiene created_at y updated_at
    public $timestamps = true; 

    protected $fillable = [
        'codigo',
        'descripcion',
        'simbolo',
    ];

    /**
     * Un tipo de moneda puede estar en muchas donaciones.
     */
    public function donaciones(): HasMany
    {
        return $this->hasMany(Donacion::class, 'id_tipo_moneda', 'id_tipo_moneda');
    }
}