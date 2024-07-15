<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\LoginController;

Route::get('/', [HomeController::class, 'index']);
Route::get('/blog/{id}', [BlogController::class, 'index']);
Route::get('/login', [LoginController::class, 'index']);

