<?php

namespace App\Services;

use App\Models\Donacion;
use App\Models\Certificado; 
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File; // Importación CLAVE para File::chmod

class CertificadoService
{
    public function generarCertificado(Donacion $donacion): ?Certificado
    {
        // 1. Verificar monto mínimo
        $montoMinimo = config('services.donaciones.monto_minimo_certificado', 100);
        
        if ((float)$donacion->monto < (float)$montoMinimo) {
            return null;
        }

        // 2. Verificar existencia
        if ($donacion->certificado) {
            return $donacion->certificado;
        }

        // 3. Preparar datos
        $certificadoUuid = Str::uuid()->toString();
        $data = [
            'donante_nombre' => $donacion->donante->nombre_completo,
            'donacion_monto' => $donacion->monto_formateado,
            'donacion_fecha' => $donacion->fecha->format('d/m/Y'),
            'certificado_uuid' => $certificadoUuid,
        ];
        $filename = 'certificados/donacion-' . $certificadoUuid . '.pdf';
        $absolutePath = Storage::disk('public')->path($filename); // Obtener la ruta absoluta antes de guardar

        // 4. GENERACIÓN DE PDF CON DEBUGGING Y VERIFICACIÓN DE PERMISOS
        try {
            $pdf = Pdf::loadView('pdf.certificado', $data)
                      ->setPaper('a4', 'landscape'); 

            $pdfContent = $pdf->output();

            if (empty($pdfContent)) {
                throw new \Exception("DomPDF generó contenido vacío. La vista Blade o la configuración de DomPDF está fallando.");
            }
            
            // 5. DEBUG de rutas y Guardado
            Log::debug("DEBUG - Certificado Service: Intentando guardar PDF.", [
                'filename' => $filename,
                'absolute_path' => $absolutePath,
                'context' => 'generarCertificado',
            ]);
            
            Storage::disk('public')->put($filename, $pdfContent);
            
            // 6. Verificar que el archivo se creó
            if (!Storage::disk('public')->exists($filename)) {
                throw new \Exception("El archivo PDF no se encontró después de guardar: {$absolutePath}");
            }

        } catch (\Exception $e) {
            Log::error(
                "Error de DOMPDF detectado en Service. Donación ID: {$donacion->id_donacion}", 
                ['error' => $e->getMessage()]
            );
            throw $e;
        }

        // 7. Crear el registro en DB
        $certificado = Certificado::create([
            'id_donacion' => $donacion->id_donacion,
            'folio' => $certificadoUuid, 
            'pdf_url' => $filename, 
            'emitido_en' => now(),
        ]);

        // 8. ASIGNAR PERMISOS explícitos para lectura web (SOLUCIÓN CRÍTICA)
        // Usamos File::chmod() para ser idiomáticos con Laravel
        if (File::exists($absolutePath)) {
            File::chmod($absolutePath, 0644);
            Log::debug("Permisos asignados al PDF (0644)", ['path' => $absolutePath]);
        } else {
            // Este caso no debería pasar, pero es una segunda capa de seguridad en el log.
            Log::warning("ADVERTENCIA: Archivo no encontrado en la ruta $absolutePath después de crear el registro DB.");
        }

        return $certificado;
    }
}