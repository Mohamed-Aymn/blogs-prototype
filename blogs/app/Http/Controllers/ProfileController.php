<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ProfileController extends Controller
{
    public function index($id)
    {
        $isAuthenticated = isAuthenticated();
        $currentUser = getUserDataFromToken();
        $isOwner = $currentUser->id == $id;

        $user = User::find($id);

        return view('profile', ['user' => $user ,'isOwner' => $isOwner]);
    }
}
