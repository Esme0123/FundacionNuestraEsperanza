<?php

namespace App\Services;

use App\Models\Donation;
use App\Models\Certificate; 
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;

class CertificadoService
{
    public function generarCertificado(Donation $donation): ?Certificate
    {
        // 1. Verificar monto mínimo
        $montoMinimo = config('services.donaciones.monto_minimo_certificado', 100);
        
        if ((float)$donation->amount < (float)$montoMinimo) {
            return null;
        }

        // 2. Verificar existencia
        if ($donation->certificate) {
            return $donation->certificate;
        }

        // 3. Preparar datos
        $certificadoUuid = Str::uuid()->toString();
        $data = [
            'donante_nombre' => $donation->donor->full_name,
            'donacion_monto' => $donation->formatted_amount,
            'donacion_fecha' => $donation->date->format('d/m/Y'),
            'certificado_uuid' => $certificadoUuid,
        ];
        $filename = 'certificados/donacion-' . $certificadoUuid . '.pdf';
        $absolutePath = Storage::disk('public')->path($filename);

        // 4. GENERACIÓN DE PDF
        try {
            $pdf = Pdf::loadView('pdf.certificado', $data)
                      ->setPaper('a4', 'landscape'); 

            $pdfContent = $pdf->output();

            if (empty($pdfContent)) {
                throw new \Exception("DomPDF generó contenido vacío.");
            }
            
            Log::debug("DEBUG - Certificado Service: Guardando PDF.", [
                'filename' => $filename,
                'path' => $absolutePath
            ]);
            
            Storage::disk('public')->put($filename, $pdfContent);
            
            if (!Storage::disk('public')->exists($filename)) {
                throw new \Exception("El archivo PDF no se encontró después de guardar.");
            }

        } catch (\Exception $e) {
            Log::error(
                "Error de DOMPDF detectado en Service. Donation ID: {$donation->id}", 
                ['error' => $e->getMessage()]
            );
            throw $e;
        }

        // 7. Crear el registro en DB
        $certificate = Certificate::create([
            'donation_id' => $donation->id,
            'folio' => $certificadoUuid, 
            'pdf_url' => $filename, 
            'issued_on' => now(),
        ]);

        // 8. ASIGNAR PERMISOS
        if (File::exists($absolutePath)) {
            File::chmod($absolutePath, 0644);
        }

        return $certificate;
    }
}