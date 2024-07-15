@extends('layouts.app')

@section('content')
    {{-- search bar --}}
    <section>
        <div class="max-w-sm">
            <div class="relative"> 
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                    <svg class="flex-shrink-0 size-4 text-gray-400 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    </div>
                    <input class="py-3 ps-10 pe-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none " type="text" placeholder="Type a name" value="" data-hs-combo-box-input="">
                </div>
            
                <div class="absolute z-50 w-full bg-white border border-gray-200 rounded-lg " style="display: none;" data-hs-combo-box-output="">
                    <div class="max-h-72 rounded-b-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 " data-hs-combo-box-output-items-wrapper=""></div>
                </div>
            </div>
        </div>
    </section>

    {{-- blogs list --}}
    <section>
        <div class="bg-white border rounded-xl shadow-sm sm:flex ">
            <div class="p-4 flex flex-col h-full sm:p-7">
                <h3 class="text-lg font-bold text-gray-800 ">
                    Card title
                </h3>
                <p class="mt-1 text-gray-500 ">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <div class="mt-5 sm:mt-auto">
                <p class="text-xs text-gray-500 mt-2">
                    Last updated 5 mins ago
                </p>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('script')
@endsection