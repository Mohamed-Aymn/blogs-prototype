<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PostController extends Controller
{
    public function index($id)
    {
        $url = env('NODE_URL') . '/editor/api/posts/' . $id;
        $data = [];

        try {
            $response = Http::get($url);
            $data = $response->json();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to fetch blog data'], 500);
        }

        // dd($data);

        if (isset($data['error']) && $data['error']) {
            $data = null;
        }

        return view('post', ['data' => $data]);
    }
}
