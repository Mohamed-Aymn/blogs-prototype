@extends('layouts.content_only')

@section('content')
    <div class="bg-white">
        <!-- Flex container for centering items -->
        <div class="flex h-screen flex-col items-center justify-center">
        <!-- Container for login form -->
        <div class="max-h-auto mx-auto min-w-64 sm:min-w-80">
            <!-- Login title and description -->
            <div class="mb-8 space-y-3">
            <p class="text-xl font-semibold">Login</p>
            <p class="text-gray-500">Welcome Back!</p>
            </div>
            <!-- Login form -->
            <form action="{{ route('login.authenticate') }}" method="POST" class="w-full">
                @csrf
                <div class="mb-3 space-y-3">
                    <div class="space-y-1">
                    <div class="space-y-2">
                        <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="email">Email</label>
                        <input type="email" class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="mail@example.com" name="email" />

                        <label class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="password">Password</label>
                        <input type="password" class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="********" name="password" />
                    </div>
                    </div>
                    <!-- Login button -->
                    <button class="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" type="submit">Login</button>
                </div>
            </form>
            <!-- Signup link -->
            <div class="text-right text-gray-500"> No account? <a class="text-blue-500" href="/signup">Create one</a>.</div>
            <a href="/" class="text-right text-gray-500 block"> Back to home page </a>
        </div>
        </div>
    </div>   
@endsection