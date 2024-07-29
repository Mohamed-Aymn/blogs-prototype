@extends('layouts.app')

@section('content')
    @if ($user != null)
        <div class="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
            <img class="w-32 h-32 rounded-full mx-auto" src="https://picsum.photos/200" alt="Profile picture">
            <h2 class="text-center text-2xl font-semibold mt-3">{{ $user->name }}</h2>
            <p class="text-center text-gray-600 mt-1">{{ $user->email }}</p>

            <div class="flex items-center w-full">
                @if ($isOwner)
                    <a href="{{ env('APP_URL') }}/editor" class="text-gray-500 flex-grow">Create Post</a>
                @endif

                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="text-gray-500 text-right">Logout</button>
                </form>
            </div>
        </div>
    @else
        <div>User not found</div>
    @endif
@endsection

@section('script')
@endsection
