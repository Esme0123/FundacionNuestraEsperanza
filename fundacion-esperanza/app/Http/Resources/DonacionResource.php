<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DonacionResource extends JsonResource
{
    /**
     * Transforma el recurso de Donacion en un array que será enviado como JSON.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_donacion' => $this->id_donacion,
            // Usamos un formato estándar de fecha y hora para que el frontend lo procese
            'fecha' => $this->fecha->format('Y-m-d H:i:s'), 
            'monto_total' => $this->monto,
            'monto_formateado' => $this->monto_formateado, // Ej: "250,00 Bs."
            'estado' => $this->estado,
            'proveedor' => $this->proveedor,
            'es_recurrente' => (bool) $this->es_recurrente,
            
            // Transformación del certificado (si existe)
            // 'whenLoaded' asegura que solo se procesa si el controlador lo precargó (with('certificado'))
            'certificado' => $this->whenLoaded('certificado', function () {
                if ($this->certificado) {
                    return [
                        'folio' => $this->certificado->folio,
                        // ✨ ESTO ES LO QUE EL FRONTEND NECESITA: EL ENLACE COMPLETO DE DESCARGA
                        'enlace_descarga' => route('certificados.descargar', ['uuid' => $this->certificado->folio]),
                        'emitido_en' => $this->certificado->emitido_en->format('Y-m-d H:i:s'),
                    ];
                }
                return null;
            }),
        ];
    }
}