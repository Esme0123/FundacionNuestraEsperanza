<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Testimonial;
use App\Models\Program;
use App\Models\News;

class DataImportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // La ruta base donde se espera encontrar los archivos JSON
        $basePath = base_path();

        try {
            // Importación de Testimonios
            $this->importData('testimonials_backup.json', Testimonial::class, $basePath);
            
            // Importación de Programas
            $this->importData('programs_backup.json', Program::class, $basePath);
            
            // Importación de Noticias
            $this->importData('news_backup.json', News::class, $basePath);

            $this->command->info('✅ ¡Todos los datos han sido importados exitosamente!');

        } catch (\Exception $e) {
            $this->command->error('❌ Ocurrió un error grave durante la importación: ' . $e->getMessage());
        }
    }

    /**
     * Función privada para manejar la lógica de importación.
     */
    private function importData(string $filename, string $modelClass, string $basePath)
    {
        $filePath = $basePath . '/' . $filename;
        $modelName = class_basename($modelClass);

        if (!File::exists($filePath)) {
            $this->command->warn("⚠️  ADVERTENCIA: Archivo {$filename} NO encontrado. Saltando la importación de {$modelName}.");
            return;
        }

        $this->command->info("🔄 Importando datos de {$modelName} desde {$filename}...");
        
        $jsonContent = File::get($filePath);
        $data = json_decode($jsonContent, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->command->error("❌ ERROR: El archivo {$filename} tiene un formato JSON inválido.");
            return;
        }
        
        // Limpia la tabla y reinserta los datos
        $modelClass::truncate(); 
        $importedCount = 0;

        foreach ($data as $item) {
            // Elimina 'id' para que la base de datos asigne uno nuevo automáticamente
            unset($item['id']); 
            $modelClass::create($item);
            $importedCount++;
        }
        $this->command->info("   -> Éxito: {$importedCount} registros de {$modelName} importados.");
    }
}