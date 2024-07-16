<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Cookie;

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

        // create jwt token for the api part
        if (!$token = Auth::guard('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $cookie = cookie('token', $token, 60, null, null, false, true); // 60 minutes, HTTP only

        // session based auth
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->route('home')->with('success', 'Logged in.')->cookie($cookie);
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }
    
    public function logout(Request $request)
    {
        // invalidate token and delete cookie
        Auth::guard('api')->logout();
        $cookie = Cookie::forget('token');

        // logout from session based auth
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // redirect
        return redirect()->route('login')->with('success', 'Logged out.')->withCookie($cookie);
    }
}
