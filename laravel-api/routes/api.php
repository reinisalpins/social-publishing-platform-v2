<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\AuthenticatedUserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthenticatedUserController::class, 'show']);
    Route::patch('/user', [AuthenticatedUserController::class, 'update']);
    Route::patch('/user/password', [AuthenticatedUserController::class, 'updatePassword']);

    Route::post('/posts', [PostController::class, 'store']);

    Route::get('/categories', [CategoryController::class, 'index']);
});

Route::middleware('guest')->group(function () {
    Route::post('/login', LoginController::class);
    Route::post('/register', RegisterController::class);
});
