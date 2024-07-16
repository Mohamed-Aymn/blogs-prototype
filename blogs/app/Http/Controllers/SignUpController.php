<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
            User::create([
                'name' => $request->first_name . ' ' . $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
    
            return redirect()->route('home')->with('success', 'Account created successfully.');
        } catch (\Exception $e) {

            dd($e);
            // Log the error for debugging purposes
    
            // Redirect back with input and an error message
            return redirect()->back()->withInput()->withErrors(['message' => 'Account creation failed. Please try again.']);
        }
    }
}
