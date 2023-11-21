<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\JwtAuthentication;

Route::post('signup', [AuthController::class, 'signup']);
Route::post('signin', [AuthController::class, 'signin']);

// authenticated user routes
Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('users', [AuthController::class, 'getAllUsers']);
    Route::get('user/{id}', [AuthController::class, 'getUser']);
    Route::delete('user/{id}', [AuthController::class, 'deleteUser']);
    Route::put('user/{id}', [AuthController::class, 'updateUser']);
});




