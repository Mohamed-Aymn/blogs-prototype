<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\SignUpController;
use App\Http\Controllers\ProfileController;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/blog/{id}', [BlogController::class, 'index']);
Route::get('/login', [LoginController::class, 'index']);
Route::get('/profile/{id}', [ProfileController::class, 'index']);

Route::get('/signup', [SignUpController::class, 'index'])->name('signup');
Route::post('/signup', [SignUpController::class, 'store'])->name('signup.store');