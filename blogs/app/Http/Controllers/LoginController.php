<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    public function index()
    {
        return view('login');
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Attempt to authenticate the user
        if (! $token = JWTAuth::attempt($credentials)) {
            return back()->withErrors([
                'email' => 'The provided credentials do not match our records.',
            ])->onlyInput('email');
        }

        setcookie("token", $token);

        return redirect()->route('home')->with('success', 'Logged in.');
    }
    
    public function logout(Request $request)
    {
        setcookie('token', '', time() - 3600, '/');

        return redirect()->route('login')->with('success', 'Logged out.');
    }
}
