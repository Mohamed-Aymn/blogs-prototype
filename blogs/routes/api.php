<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use App\Models\User;


Route::get("/hello", function (){

    Redis::publish('test-channel', 'a test message');

    return "done";
});

Route::prefix('posts')->group(function () {
    Route::get('/', function (Request $request) {
        $url = env('NODE_URL') . '/editor/api/posts';
        try {
            $response = Http::get($url);
            return response()->json($response->json());
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to fetch data from external service'], 500);
        }
    });

    Route::get('/{id}', function ($id) {
        $url = env('NODE_URL') . "/editor/api/posts/{$id}";
        try {
            $response = Http::get($url);
            return response()->json($response->json());
        } catch (\Exception $e) {
            return response()->json(['error' => 'unable to fetch post'], 500);
        }
    });
});

Route::post('/register', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
    ]);

    try {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return "user created successfully.";
    } catch (\Exception $e) {
        return "user not created.";
    }
});

Route::post('/login', function (Request $request) {
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (! $token = JWTAuth::attempt($credentials)) {
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }
    return response()->json(token: $token);
});