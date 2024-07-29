<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index($id)
    {
        $isAuthenticated = isAuthenticated();
        $currentUser = getUserDataFromToken();
        $isOwner = $currentUser->id == $id;

        return view('profile', ['user' => $currentUser,'isOwner' => $isOwner]);
    }
}
