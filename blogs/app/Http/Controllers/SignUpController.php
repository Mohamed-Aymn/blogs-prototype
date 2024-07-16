<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class SignUpController extends Controller
{
    public function index()
    {
        return view('signup');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        try {
            $user = User::create([
                'name' => $request->first_name . ' ' . $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // token based auth
            $token = Auth::guard('api')->login($user);
            $cookie = cookie('token', $token, 60, null, null, false, true); // 60 minutes, HTTP only

            // session based auth
            Auth::login($user);

            return redirect()->route('home')->with('success', 'Account created successfully.')->cookie($cookie);;
        } catch (\Exception $e) {

            dd($e);
            // Redirect back with input and an error message
            return redirect()->back()->withInput()->withErrors(['message' => 'Account creation failed. Please try again.']);
        }
    }
}
