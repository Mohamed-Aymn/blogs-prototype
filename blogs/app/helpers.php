<?php

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

if (!function_exists('isAuthenticated')) {
    /**
     * Check if the user is authenticated based on the JWT token.
     *
     * @return bool
     */
    function isAuthenticated() {
        try {
            $token = isset($_COOKIE['token']) ? $_COOKIE['token'] : null;
            if ($token && JWTAuth::setToken($token)->check()) {
                return true;
            }
        } catch (JWTException $e) {
            // Token is invalid
        }
        return false;
    }
}
