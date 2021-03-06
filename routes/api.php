<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AdminController;

Route::post('/register', 'App\Http\Controllers\AuthController@register');
Route::post('/login', 'App\Http\Controllers\AuthController@login');
Route::post('/forgotPassword', 'App\Http\Controllers\AuthController@forgotPassword');
Route::post('/resetPassword', 'App\Http\Controllers\AuthController@resetPassword');
Route::get('/admin', 'App\Http\Controllers\AdminController@admin');
// Route::get('/getProduct/{id}', 'App\Http\Controllers\AdminController@admin');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Admin
    Route::get('/adminUsers', [AdminController::class, 'adminUsers']);
    Route::post('/updateUser', [AdminController::class, 'updateUser']);

    Route::get('/adminBasics', [AdminController::class, 'adminBasics']);
    Route::post('/createBasic', [AdminController::class, 'createBasic']);
    Route::post('/updateBasic', [AdminController::class, 'updateBasic']);

    Route::get('/adminProducts', [AdminController::class, 'adminProducts']);
    Route::get('/addProductOptions', [AdminController::class, 'addProductOptions']); 
    Route::post('/createProduct', [AdminController::class, 'createProduct']);
    Route::post('/changeProductStatus', [AdminController::class, 'changeProductStatus']);
    Route::get('/getProduct/{id}', [AdminController::class, 'getProduct']);
    Route::post('/updateProduct', [AdminController::class, 'updateProduct']);

    Route::get('/adminTutorials', [AdminController::class, 'adminTutorials']);
    Route::post('/createTutorial', [AdminController::class, 'createTutorial']);
    Route::post('/updateTutorial', [AdminController::class, 'updateTutorial']);

    Route::get('/adminLanguages', [AdminController::class, 'adminLanguages']);
    Route::post('/createLanguage', [AdminController::class, 'createLanguage']);
    Route::post('/updateLanguage', [AdminController::class, 'updateLanguage']);

    // Admin
});