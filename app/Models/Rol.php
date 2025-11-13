<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Rol extends Model
{
    protected $table = 'roles';
    protected $primaryKey = 'id_rol';
    public $timestamps = true;

    protected $fillable = ['nombre','descripcion'];

    public function personas(): BelongsToMany {
        return $this->belongsToMany(Persona::class, 'persona_rol', 'id_rol', 'id_persona')
            ->withPivot('asignado_en');
    }
}
