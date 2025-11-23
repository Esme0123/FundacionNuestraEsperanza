<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Corregir Programas
        Schema::table('programas', function (Blueprint $table) {
            $table->string('imagen')->nullable()->after('descripcion'); 
            $table->string('color')->nullable()->default('bg-celeste-fondo')->after('imagen'); 
            
            $table->dropColumn(['fecha', 'hora']); 
        });

        // 2. Corregir Testimonios (Asumiendo que existe la tabla)
        if (Schema::hasTable('testimonios')) {
            Schema::table('testimonios', function (Blueprint $table) {
                if (!Schema::hasColumn('testimonios', 'nombre')) {
                    $table->string('nombre')->nullable(); 
                }
                // Aseguramos que tenga imagen
                if (!Schema::hasColumn('testimonios', 'imagen')) {
                    $table->string('imagen')->nullable(); 
                }
                // Aseguramos que tenga cargo o rol (ej. "Madre de familia")
                if (!Schema::hasColumn('testimonios', 'cargo')) {
                    $table->string('cargo')->nullable(); 
                }
            });
        }

        // 3. Crear tabla Noticias 
        // Para no complicarnos con 'posts', crearemos 'noticias' limpia si no existe
        if (!Schema::hasTable('noticias')) {
            Schema::create('noticias', function (Blueprint $table) {
                $table->id();
                $table->string('titulo');
                $table->text('contenido');
                $table->string('imagen')->nullable();
                $table->date('fecha_publicacion')->default(now());
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
