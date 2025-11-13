<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $user = $request->user();
        if (!$user) abort(401, 'No autenticado');
        $has = $user->roles()->whereIn('nombre', $roles)->exists();
        if (!$has) abort(403, 'No autorizado');
        return $next($request);
    }
}
