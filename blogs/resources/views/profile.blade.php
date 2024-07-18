@extends('layouts.app')

<?php $user = getUserDataFromToken();?>

@section('content')
    <div class="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
        <img class="w-32 h-32 rounded-full mx-auto" src="https://picsum.photos/200" alt="Profile picture">
        <h2 class="text-center text-2xl font-semibold mt-3">{{$user->name}}</h2>
        <p class="text-center text-gray-600 mt-1">{{$user->email}}</p>

        <div class="flex items-center w-full">
            <a href="http://localhost:3000" class="text-gray-500 flex-grow">Create Post</a>
            <form action="{{ route('logout') }}" method="POST">
                @csrf
                <button type="submit" class="text-gray-500 text-right">Logout</button>
            </form>
        </div>
    </div>

@endsection

@section('script')
@endsection