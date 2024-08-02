@extends('layouts.app')

@section('content')
    @if ($data != null)
        <section class="section-first">
            <div class="text-4xl border-0 outline-none py-1 w-full">{{ $data['title'] }}</div>
            <div class="mt-10">
                @foreach ($data['content'] as $item)
                    <div class="item w-full border-0 outline-none resize-none hover:bg-gray-100 px-2 py-1 transition-all">
                        {{ $item['data'] ?? 'No data available' }} <!-- Adjust as per the structure of each item -->
                    </div>
                @endforeach
            </div>
        </section>
    @else
        <section class="section-first">Post not found</section>
    @endif
@endsection

@section('script')
@endsection
