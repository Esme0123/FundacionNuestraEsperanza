<?php

namespace App\Jobs;

use App\Models\Donacion;
use App\Services\CertificadoService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class GenerarCertificadoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public Donacion $donacion)
    {
        //
    }

    public function handle(CertificadoService $certificadoService): void
    {
        try {
            $certificado = $certificadoService->generarCertificado($this->donacion);

            if ($certificado) {
                Log::info("Certificado {$certificado->folio} generado para Donación ID: {$this->donacion->id_donacion}");
            }
        } catch (\Exception $e) {
            // El error real se registra en el servicio, aquí solo confirmamos que el Job fallará
            Log::error("El Job falló para Donación ID: {$this->donacion->id_donacion}. Mensaje: {$e->getMessage()}");
            
            throw $e; 
        }
    }
}