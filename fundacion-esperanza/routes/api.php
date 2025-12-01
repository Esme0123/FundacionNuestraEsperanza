<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RoleController;
use App\Http\Controllers\DonationController;
use Illuminate\Support\Facades\Route;
use App\Models\Program;
use Illuminate\Http\Request;
use App\Models\News;
use App\Models\Testimonial;
use App\Models\ContactMessage;
use App\Models\Subscriber;

/*
|--------------------------------------------------------------------------
| Authentication Routes (Public)
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('login', function () {
        return response()->json(['message' => 'Unauthenticated.'], 401);
    })->name('login');

    /*
    |--------------------------------------------------------------------------
    | User Routes (Protected)
    |--------------------------------------------------------------------------
    */
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('change-password', [AuthController::class, 'changePassword']);

        // Donor Panel Routes
        // Endpoint: GET /api/donations/my
        Route::get('donations/my', [DonationController::class, 'myDonations']);
    });
    
});


/*
|--------------------------------------------------------------------------
| Admin Routes (Protected by Role)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('roles', [RoleController::class, 'index']);
    Route::post('users/{userId}/roles/assign', [RoleController::class, 'assign']);
    Route::post('users/{userId}/roles/revoke', [RoleController::class, 'revoke']);
});

// 1. ENDPOINT DE PROGRAMAS
// URL para el Frontend: http://127.0.0.1:8000/api/programs
Route::get('/programs', function () {
    // Obtenemos solo los activos y ordenamos por fecha de creación
    return Program::where('is_active', true)->latest()->get()->map(function ($program) {
        return [
            'id' => $program->id,
            'title' => $program->title,
            // Limpiamos la descripción de etiquetas HTML excesivas si es necesario, o se envían tal cual
            'description' => $program->description, 
            'image' => $program->image ? asset('storage/' . $program->image) : null,
            'color' => $program->color,
        ];
    });
});

// 2. ENDPOINT DE NOTICIAS
// URL para el Frontend: http://127.0.0.1:8000/api/news
Route::get('/news', function () {
    return News::latest('publication_date')->get()->map(function ($news) {
        return [
            'id' => $news->id,
            'title' => $news->title,
            'content' => $news->content,
            'image' => $news->image ? asset('storage/' . $news->image) : null,
            'date' => $news->publication_date ? $news->publication_date->format('d/m/Y') : null,
        ];
    });
});

// 3. ENDPOINT DE TESTIMONIOS
// URL para el Frontend: http://127.0.0.1:8000/api/testimonials
Route::get('/testimonials', function () {
    return Testimonial::latest()->get()->map(function ($testimonial) {
        return [
            'id' => $testimonial->id,
            'name' => $testimonial->name,
            'role' => $testimonial->role,
            'message' => $testimonial->content, // Renombramos 'content' a 'message' si el front lo prefiere
            'image' => $testimonial->image ? asset('storage/' . $testimonial->image) : null,
        ];
    });
});
// 4. ENDPOINT PARA CONTACTO (Recibe datos del formulario)
Route::post('/contact', function (Request $request) {
    // Validamos que los datos vengan bien
    $validated = $request->validate([
        'name' => 'required|string',
        'last_name' => 'nullable|string',
        'email' => 'required|email',
        'message' => 'required|string',
    ]);

    // Guardamos en la BD
    ContactMessage::create($validated);

    return response()->json(['message' => 'Mensaje enviado con éxito'], 201);
});

// 5. ENDPOINT PARA SUSCRIPCIÓN
Route::post('/subscribe', function (Request $request) {
    $validated = $request->validate([
        'email' => 'required|email|unique:subscribers,email',
    ]);

    Subscriber::create($validated);

    return response()->json(['message' => 'Suscripción exitosa'], 201);
});