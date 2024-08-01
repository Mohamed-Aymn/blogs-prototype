<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class BearerTokenCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $bearerToken = $request->bearerToken();

        // if ($bearerToken == null ) {
        if (!$bearerToken || !$this->validateToken($bearerToken)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }

    /**
     * Validate the token.
     *
     * @param  string  $token
     * @return bool
     */
    protected function validateToken($token)
    {
        // Implement your token validation logic here
        // For example, you might decode the token and check its validity
        
        // Placeholder: Replace this with actual validation logic
        if (isBearerAuthenticated($token)){
            return true;
        }

        return false;
    }
}
