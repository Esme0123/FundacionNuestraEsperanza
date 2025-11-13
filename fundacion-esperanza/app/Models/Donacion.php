<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Donacion extends Model
{
    protected $table = 'donaciones';
    protected $primaryKey = 'id_donacion';
    
    // CORREGIDO: Tu tabla SÍ tiene timestamps (created_at, updated_at)
    public $timestamps = true; 

    protected $fillable = [
        'id_donante',
        'id_campania',
        'monto',
        'neto', // <-- CORREGIDO (en lugar de monto_neto)
        'tarifa',
        'id_tipo_moneda', // <-- CORREGIDO (en lugar de moneda)
        // 'mensaje', // No está en tu SQL, pero lo dejo comentado
        'estado',
        'es_recurrente',
        'es_anonima',
        'proveedor',
        'id_pago_proveedor',
        'fecha', // Añadido para el comando de prueba
    ];

    /**
     * Define los campos que deben ser casteados a tipos nativos.
     * 'fecha' es un timestamp en la BD.
     */
    protected $casts = [
        'fecha' => 'datetime',
        'es_recurrente' => 'boolean',
        'es_anonima' => 'boolean',
        'monto' => 'decimal:2',
        'neto' => 'decimal:2', // <-- CORREGIDO (en lugar de monto_neto)
        'tarifa' => 'decimal:2',
    ];

    /**
     * Una donación pertenece a un donante.
     */
    public function donante(): BelongsTo
    {
        return $this->belongsTo(Donante::class, 'id_donante', 'id_donante');
    }

    /**
     * Una donación puede tener un certificado.
     */
    public function certificado(): HasOne
    {
        return $this->hasOne(Certificado::class, 'id_donacion', 'id_donacion');
    }

    /**
     * Una donación pertenece a un tipo de moneda.
     * (NUEVA RELACIÓN REQUERIDA)
     */
    public function tipoMoneda(): BelongsTo
    {
        return $this->belongsTo(TipoMoneda::class, 'id_tipo_moneda', 'id_tipo_moneda');
    }


    /**
     * Una donación puede pertenecer a una campaña.
     */
    public function campania(): BelongsTo
    {
        // Asumiremos que crearás el modelo Campania más adelante
        return $this->belongsTo(Campania::class, 'id_campania', 'id_campania');
    }

    /**
     * Accessor para obtener el monto formateado.
     * (Usado en el CertificadoService: $donacion->monto_formateado)
     */
    protected function montoFormateado(): Attribute
    {
        return Attribute::make(
            get: function () {
                // CORREGIDO: Obtener el símbolo de la moneda desde la relación
                $simbolo = $this->tipoMoneda ? $this->tipoMoneda->simbolo : ''; // Ej: 'Bs.' o '$'
                return number_format($this->monto, 2, ',', '.') . ' ' . $simbolo;
            }
        );
    }
}