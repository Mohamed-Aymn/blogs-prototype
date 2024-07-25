<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;

Route::get('/posts', function (Request $request) {
    $url = env('NODE_URL') . '/editor/api/posts';

    try {
        $response = Http::get($url);
        return response()->json($response->json());
    } catch (\Exception $e) {
        return response()->json(['error' => 'Unable to fetch data from external service'], 500);
    }
});
