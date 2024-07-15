<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Blogs</title>
        @vite('resources/css/app.css')
    </head>

    <body class="flex flex-col min-h-screen">

        <main class="min-h-screen">
            @yield('content')
        </main>

        @yield('script')
    </body>
</html>
