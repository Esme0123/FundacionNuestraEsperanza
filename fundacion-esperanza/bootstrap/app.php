<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    /**
     * Paso 1: Definir los archivos de rutas.
     * Es crucial que la línea 'api' esté aquí para que Laravel cargue
     * nuestras rutas de API desde el archivo routes/api.php.
     * La versión de la otra IA omitía esto.
     */
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    /**
     * Paso 2: Configurar los Middlewares.
     * Aquí le decimos a Laravel cómo proteger nuestras rutas.
     */
    ->withMiddleware(function (Middleware $middleware) {
        /**
         * Le decimos a Laravel que use el guardián de Sanctum para
         * proteger TODAS las rutas definidas en routes/api.php.
         * Esta es la segunda pieza crítica que la otra IA omitió.
         */
        $middleware->api(append: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        /**
         * Aquí registramos los "apodos" para nuestros middlewares personalizados,
         * permitiéndonos usarlos fácilmente en las rutas (ej: ->middleware('role:admin')).
         */
        $middleware->alias([
            //'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
            'role' => \App\Http\Middleware\EnsureRole::class,
        ]);

        $middleware->validateCsrfTokens(except: [
            '/api/public/*',
            '/api/webhooks/*',
            '/api/subscribe',
            '/api/contact',
            'stripe/*',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Configuración de manejo de excepciones.
    })->create();
