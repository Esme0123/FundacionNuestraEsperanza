<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RoleController;
use App\Http\Controllers\DonationController;
use Illuminate\Support\Facades\Route;

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