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

if (!function_exists('isBearerAuthenticated')) {
    /**
     * Check if the user is authenticated based on the JWT token.
     *
     * @return bool
     */
    function isBearerAuthenticated($token) {
        try {
            if ($token && JWTAuth::setToken($token)->check()) {
                return true;
            }
        } catch (JWTException $e) {
            // Token is invalid
        }
        return false;
    }
}

if (!function_exists('getUserDataFromToken')){
    function getUserDataFromToken() {
        try {
            $token = isset($_COOKIE['token']) ? $_COOKIE['token'] : null;
            if ($token) {
                $user = JWTAuth::setToken($token)->authenticate();
                if ($user) {
                    return $user;
                }
            }
        } catch (JWTException $e) {
            // Token is invalid
        }
        return null;
    }
}
