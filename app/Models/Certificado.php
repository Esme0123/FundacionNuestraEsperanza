<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Certificado extends Model
{
    protected $table = 'certificados';
    protected $primaryKey = 'id_certificado';
    // Tu tabla no tiene created_at/updated_at.
    public $timestamps = false; 

    protected $fillable = [
        'id_donacion',
        'folio',
        'pdf_url',
        'emitido_en', 
    ];

    /**
     * CRÍTICO: Castea emitido_en a datetime para usar format() en el Resource.
     */
    protected $casts = [
        'emitido_en' => 'datetime',
    ];

    public function donacion(): BelongsTo
    {
        return $this->belongsTo(Donacion::class, 'id_donacion', 'id_donacion');
    }
}