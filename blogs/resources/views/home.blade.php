@extends('layouts.app')

@section('content')
    <section class="section-first">
        {{-- search bar --}}
        <div class="flex justify-center w-full mb-7">
            <div class="relative max-w-md flex-grow"> 
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                        <svg class="flex-shrink-0 size-4 text-gray-400 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </svg>
                    </div>
                    <input class="py-3 ps-10 pe-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none " type="text" placeholder="Search for a blog" value="" data-hs-combo-box-input="">
                </div>
            
            </div>
        </div>

        {{-- blogs list --}}
        @if($posts->isEmpty())
            <p>No posts found.</p>
        @else
            @foreach($posts as $post)
                <a class="bg-white border rounded-xl shadow-sm sm:flex mb-2" href="post/{{$post->id}}">
                    <div class="p-4 flex flex-col h-full sm:p-7">
                        <h3 class="text-lg font-bold text-gray-800 ">
                            {{ $post->title }}
                        </h3>
                        <p class="mt-1 text-gray-500 ">
                            {{ $post->body}}
                        </p>
                        <div class="mt-5 sm:mt-auto">
                        <p class="text-xs text-gray-500 mt-2">
                            {{ $post->created_at}}
                        </p>
                        </div>
                    </div>
                </a>
            @endforeach
        @endif

    </section>
@endsection

@section('script')
@endsection