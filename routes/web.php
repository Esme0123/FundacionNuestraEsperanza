<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CertificadoController;
//Esta ruta es la que usa DonacionResource para generar el enlace de descarga
Route::get('/certificados/{uuid}', [CertificadoController::class, 'descargar'])
     ->name('certificados.descargar');
Route::get('/', function () {
    return view('welcome');
});
