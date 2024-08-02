<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Mohamed Aymn Khanfour',
            'email' => 'mohamedaymn218@gmail.com',
            'password' => Hash::make("12345678"),
        ]);

        DB::transaction(function () use ($user) {
            Post::create([
                'id' => "64c5b2fbcf85e6c0c9fe5a1a",
                'title' => "Test Post",
                'user_id' => $user->id,
                'avg_read_time' => 3,
                'body' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the", 
            ]);
        
            Post::create([
                'id' => "64c5b2fbcf85e6c0c9fe5a1b",
                'title' => "Second Test Post",
                'user_id' => $user->id,
                'avg_read_time' => 5,
                'body' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the", 
            ]);
        });
    }
}
