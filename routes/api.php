<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

Route::post('/register', 'App\Http\Controllers\AuthController@register');
Route::post('/login', 'App\Http\Controllers\AuthController@login');
Route::post('/forgotPassword', 'App\Http\Controllers\AuthController@forgotPassword');
Route::post('/resetPassword', 'App\Http\Controllers\AuthController@resetPassword');
// Route::get('/admin', 'App\Http\Controllers\AdminController@admin');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Admin
        Route::get('/adminUsers', [AdminController::class, 'adminUsers']);

    // Admin
});